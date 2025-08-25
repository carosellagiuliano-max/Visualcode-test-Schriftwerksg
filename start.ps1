# Build frontend and start backend (Windows PowerShell)
Write-Host "Building frontend..."
npm --prefix ./frontend run build
if ($LASTEXITCODE -ne 0) { Write-Error "Frontend build failed"; exit $LASTEXITCODE }

Write-Host "Starting backend..."
# Start backend in a new PowerShell window so it keeps running. Adjust path if needed.
Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$PSScriptRoot\backend'; npm run start"
