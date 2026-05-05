$testCases = @(
    @{
        name = "Valid submission"
        body = @{
            name    = "Jane Doe"
            email   = "jane@email.com"
            type    = "React/Next.js"
            budget  = "`$50k-`$100k"
            message = "I need help building a React application with advanced features and scalability."
        }
    },
    @{
        name = "Missing email"
        body = @{
            name    = "John Smith"
            type    = "Frontend development"
            budget  = "`$25k-`$50k"
            message = "Need a responsive portfolio website."
        }
    },
    @{
        name = "Invalid email"
        body = @{
            name    = "Bob Jones"
            email   = "not-an-email"
            type    = "QA & Testing"
            budget  = "`$10k-`$25k"
            message = "Looking for testing expertise."
        }
    },
    @{
        name = "Short message"
        body = @{
            name    = "Alice Brown"
            email   = "alice@email.com"
            type    = "Frontend development"
            budget  = "`$10k-`$25k"
            message = "Need help"
        }
    },
    @{
        name = "Invalid budget"
        body = @{
            name    = "Charlie White"
            email   = "charlie@email.com"
            type    = "React/Next.js"
            budget  = "`$500k+"
            message = "This is a very detailed message about our complex project requirements and timeline."
        }
    }
)

foreach ($test in $testCases) {
    Write-Host "`n==== Test: $($test.name) ====" -ForegroundColor Cyan
    
    $jsonBody = $test.body | ConvertTo-Json
    Write-Host "Request: $jsonBody" -ForegroundColor Gray
    
    try {
        $response = Invoke-RestMethod -Uri http://localhost:3000/api/contact `
            -Method Post `
            -Body $jsonBody `
            -ContentType "application/json" `
            -ErrorAction Stop
        
        Write-Host "[SUCCESS] Response: " -ForegroundColor Green
        $response | ConvertTo-Json | Write-Host
    }
    catch {
        Write-Host "[ERROR] Response: " -ForegroundColor Red
        if ($_.Exception.Response) {
            $streamReader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
            $streamReader.ReadToEnd() | ConvertFrom-Json | ConvertTo-Json | Write-Host
        }
        else {
            $_.Exception.Message | Write-Host
        }
    }
    
    Start-Sleep -Milliseconds 500
}
