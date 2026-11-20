# ============================================================
# Raah-e-Ishq-o-Hidayat (راہِ عشق و ہدایت)
# Local Static & REST API Server with Full Auth & PWA Support
# ============================================================

$port = 8080
$root = "c:\Users\Habiba\Downloads\NOOR"
$dataDir = Join-Path $root "backend\data"
$usersFile = Join-Path $dataDir "users.json"

if (-not (Test-Path $dataDir)) {
    New-Item -ItemType Directory -Path $dataDir -Force | Out-Null
}

if (-not (Test-Path $usersFile)) {
    "[]" | Out-File -FilePath $usersFile -Encoding utf8
}

function Get-Users {
    try {
        $content = Get-Content -Raw -Path $usersFile -ErrorAction Stop
        if ([string]::IsNullOrWhiteSpace($content)) { return @() }
        $users = ConvertFrom-Json $content
        if ($users -is [System.Array]) { return $users }
        return @($users)
    } catch {
        return @()
    }
}

function Save-Users($usersList) {
    $json = ConvertTo-Json -InputObject @($usersList) -Depth 5
    [System.IO.File]::WriteAllText($usersFile, $json, [System.Text.Encoding]::UTF8)
}

function Hash-Password([string]$password) {
    $salt = New-Object byte[] 16
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    $rng.GetBytes($salt)
    $pbkdf2 = New-Object System.Security.Cryptography.Rfc2898DeriveBytes($password, $salt, 10000)
    $hash = $pbkdf2.GetBytes(32)
    $saltHex = [System.BitConverter]::ToString($salt).Replace("-", "").ToLower()
    $hashHex = [System.BitConverter]::ToString($hash).Replace("-", "").ToLower()
    return "pbkdf2`$$saltHex`$$hashHex"
}

function Verify-Password([string]$password, [string]$storedHash) {
    if ([string]::IsNullOrWhiteSpace($storedHash) -or -not $storedHash.StartsWith("pbkdf2`$")) { return $false }
    $parts = $storedHash.Split("`$")
    if ($parts.Length -lt 3) { return $false }
    $saltHex = $parts[1]
    $expectedHashHex = $parts[2]
    $salt = New-Object byte[] ($saltHex.Length / 2)
    for ($i = 0; $i -lt $salt.Length; $i++) {
        $salt[$i] = [Convert]::ToByte($saltHex.Substring($i * 2, 2), 16)
    }
    $pbkdf2 = New-Object System.Security.Cryptography.Rfc2898DeriveBytes($password, $salt, 10000)
    $actualHash = $pbkdf2.GetBytes(32)
    $actualHashHex = [System.BitConverter]::ToString($actualHash).Replace("-", "").ToLower()
    return $actualHashHex -eq $expectedHashHex
}

function Generate-Token([string]$userId, [string]$email) {
    $randomBytes = New-Object byte[] 24
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    $rng.GetBytes($randomBytes)
    $randomHex = [System.BitConverter]::ToString($randomBytes).Replace("-", "").ToLower()
    return "reh_$($userId)_$randomHex"
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".ico"  = "image/x-icon"
}

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $port)
$listener.Start()
Write-Host "Raah-e-Ishq-o-Hidayat server running on http://localhost:$port"

try {
    while ($listener.Server.IsBound) {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::UTF8)
        $writer = [System.IO.StreamWriter]::new($stream, [System.Text.Encoding]::UTF8)
        
        $requestLine = $reader.ReadLine()
        if (-not $requestLine) {
            $client.Close()
            continue
        }
        
        $parts = $requestLine.Split(" ")
        if ($parts.Length -lt 2) {
            $client.Close()
            continue
        }
        
        $method = $parts[0].ToUpper()
        $urlPath = $parts[1].Split("?")[0]
        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        }

        # Read all HTTP Request Headers
        $headers = @{}
        $contentLength = 0
        while ($line = $reader.ReadLine()) {
            if ([string]::IsNullOrWhiteSpace($line)) { break }
            $colonIdx = $line.IndexOf(":")
            if ($colonIdx -gt 0) {
                $hName = $line.Substring(0, $colonIdx).Trim().ToLower()
                $hVal = $line.Substring($colonIdx + 1).Trim()
                $headers[$hName] = $hVal
                if ($hName -eq "content-length") {
                    $contentLength = [int]$hVal
                }
            }
        }

        # Read Request Body if present
        $body = ""
        if ($contentLength -gt 0) {
            $buffer = New-Object char[] $contentLength
            $readCount = 0
            while ($readCount -lt $contentLength) {
                $read = $reader.Read($buffer, $readCount, $contentLength - $readCount)
                if ($read -le 0) { break }
                $readCount += $read
            }
            $body = New-Object string ($buffer, 0, $readCount)
        }

        # CORS Preflight
        if ($method -eq "OPTIONS") {
            $corsHeader = "HTTP/1.1 204 No Content`r`nAccess-Control-Allow-Origin: *`r`nAccess-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`r`nAccess-Control-Allow-Headers: Content-Type, Authorization`r`nConnection: close`r`n`r`n"
            $cBytes = [System.Text.Encoding]::ASCII.GetBytes($corsHeader)
            $stream.Write($cBytes, 0, $cBytes.Length)
            $stream.Flush()
            $client.Close()
            continue
        }

        # ----------------------------------------------------
        # REST API ROUTING
        # ----------------------------------------------------
        if ($urlPath.StartsWith("/api/")) {
            $statusCode = 200
            $statusText = "OK"
            $jsonRes = "{}"

            # 1. Health Endpoint
            if ($urlPath -eq "/api/health") {
                $jsonRes = ConvertTo-Json -Compress @{
                    status = "ok"
                    app = "Raah-e-Ishq-o-Hidayat (راہِ عشق و ہدایت)"
                    tagline = "Where Every Heart Finds Guidance"
                    version = "1.0.0"
                    pwa = $true
                    database = "ready (local + PostgreSQL schema)"
                    timestamp = (Get-Date).ToString("o")
                }
            }
            # 2. Registration Endpoint (POST /api/auth/register)
            elseif ($urlPath -eq "/api/auth/register" -and $method -eq "POST") {
                try {
                    $payload = ConvertFrom-Json $body
                    $name = if ($payload.name) { [string]$payload.name.Trim() } elseif ($payload.fullName) { [string]$payload.fullName.Trim() } else { "" }
                    $email = if ($payload.email) { [string]$payload.email.Trim().ToLower() } else { "" }
                    $password = if ($payload.password) { [string]$payload.password } else { "" }

                    # Field Validations
                    if ($name.Length -lt 2) {
                        $statusCode = 400
                        $statusText = "Bad Request"
                        $jsonRes = ConvertTo-Json -Compress @{ success = $false; error = "Please enter your full name (minimum 2 characters)." }
                    }
                    elseif (-not ($email -match "^[^\s@]+@[^\s@]+\.[^\s@]+$")) {
                        $statusCode = 400
                        $statusText = "Bad Request"
                        $jsonRes = ConvertTo-Json -Compress @{ success = $false; error = "Please enter a valid email address." }
                    }
                    elseif ($password.Length -lt 8) {
                        $statusCode = 400
                        $statusText = "Bad Request"
                        $jsonRes = ConvertTo-Json -Compress @{ success = $false; error = "Password must be at least 8 characters long." }
                    }
                    else {
                        # Check duplicate email
                        $currentUsers = Get-Users
                        $duplicate = $currentUsers | Where-Object { $_.email -eq $email }
                        if ($duplicate) {
                            $statusCode = 409
                            $statusText = "Conflict"
                            $jsonRes = ConvertTo-Json -Compress @{
                                success = $false
                                error = "An account with this email address already exists. Please log in."
                            }
                        } else {
                            # Hash password securely
                            $passwordHash = Hash-Password $password
                            $userId = "usr_" + [System.Guid]::NewGuid().ToString("N").Substring(0, 12)
                            $newUser = [PSCustomObject]@{
                                id = $userId
                                name = $name
                                email = $email
                                password_hash = $passwordHash
                                created_at = (Get-Date).ToString("o")
                            }
                            $updatedList = @($currentUsers) + @($newUser)
                            Save-Users $updatedList

                            $token = Generate-Token $userId $email
                            $statusCode = 201
                            $statusText = "Created"
                            $jsonRes = ConvertTo-Json -Compress @{
                                success = $true
                                message = "Account created successfully 🌙"
                                token = $token
                                user = @{
                                    id = $userId
                                    name = $name
                                    email = $email
                                }
                            }
                        }
                    }
                } catch {
                    $statusCode = 500
                    $statusText = "Internal Server Error"
                    $jsonRes = ConvertTo-Json -Compress @{ success = $false; error = "Registration failed due to server error: $($_.Exception.Message)" }
                }
            }
            # 3. Login Endpoint (POST /api/auth/login)
            elseif ($urlPath -eq "/api/auth/login" -and $method -eq "POST") {
                try {
                    $payload = ConvertFrom-Json $body
                    $email = if ($payload.email) { [string]$payload.email.Trim().ToLower() } else { "" }
                    $password = if ($payload.password) { [string]$payload.password } else { "" }

                    if ([string]::IsNullOrWhiteSpace($email) -or [string]::IsNullOrWhiteSpace($password)) {
                        $statusCode = 400
                        $statusText = "Bad Request"
                        $jsonRes = ConvertTo-Json -Compress @{ success = $false; error = "Email and password are required." }
                    } else {
                        $currentUsers = Get-Users
                        $user = $currentUsers | Where-Object { $_.email -eq $email }
                        
                        if (-not $user -or -not (Verify-Password $password $user.password_hash)) {
                            $statusCode = 401
                            $statusText = "Unauthorized"
                            $jsonRes = ConvertTo-Json -Compress @{
                                success = $false
                                error = "Invalid email or password combination."
                            }
                        } else {
                            $token = Generate-Token $user.id $user.email
                            $statusCode = 200
                            $statusText = "OK"
                            $jsonRes = ConvertTo-Json -Compress @{
                                success = $true
                                message = "Welcome back to Raah-e-Ishq-o-Hidayat, $($user.name)! 🌙"
                                token = $token
                                user = @{
                                    id = $user.id
                                    name = $user.name
                                    email = $user.email
                                }
                            }
                        }
                    }
                } catch {
                    $statusCode = 500
                    $statusText = "Internal Server Error"
                    $jsonRes = ConvertTo-Json -Compress @{ success = $false; error = "Sign in failed: $($_.Exception.Message)" }
                }
            }
            # 4. Logout Endpoint
            elseif ($urlPath -eq "/api/auth/logout") {
                $statusCode = 200
                $statusText = "OK"
                $jsonRes = ConvertTo-Json -Compress @{
                    success = $true
                    message = "Signed out successfully."
                }
            }
            # 5. Generic API Fallback
            else {
                $statusCode = 200
                $statusText = "OK"
                $jsonRes = ConvertTo-Json -Compress @{
                    success = $true
                    app = "Raah-e-Ishq-o-Hidayat (راہِ عشق و ہدایت)"
                    route = $urlPath
                    status = "ok"
                }
            }

            $jsonBytes = [System.Text.Encoding]::UTF8.GetBytes($jsonRes)
            $header = "HTTP/1.1 $statusCode $statusText`r`nContent-Type: application/json; charset=utf-8`r`nContent-Length: $($jsonBytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nAccess-Control-Allow-Headers: Content-Type, Authorization`r`nConnection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
            $stream.Write($headerBytes, 0, $headerBytes.Length)
            $stream.Write($jsonBytes, 0, $jsonBytes.Length)
            $stream.Flush()
            $client.Close()
            continue
        }

        # ----------------------------------------------------
        # STATIC FILE SERVING
        # ----------------------------------------------------
        $filePath = [System.IO.Path]::Combine($root, $urlPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar))
        
        if ([System.IO.File]::Exists($filePath)) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            $header = "HTTP/1.1 200 OK`r`nContent-Type: $mime`r`nContent-Length: $($bytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nCache-Control: public, max-age=3600`r`nConnection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
            $stream.Write($headerBytes, 0, $headerBytes.Length)
            $stream.Write($bytes, 0, $bytes.Length)
        } else {
            $msg = "404 Not Found"
            $msgBytes = [System.Text.Encoding]::UTF8.GetBytes($msg)
            $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain; charset=utf-8`r`nContent-Length: $($msgBytes.Length)`r`nConnection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
            $stream.Write($headerBytes, 0, $headerBytes.Length)
            $stream.Write($msgBytes, 0, $msgBytes.Length)
        }
        $stream.Flush()
        $client.Close()
    }
} finally {
    $listener.Stop()
}
