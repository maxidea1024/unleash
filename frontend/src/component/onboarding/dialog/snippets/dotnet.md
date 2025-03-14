1\. Install the SDK
```sh
dotnet add package unleash.client
// If you do not have a json library in your project:
dotnet add package Newtonsoft.Json
```

2\. Initialize Ganpa
```csharp
using Ganpa;
using Ganpa.ClientFactory;

public class Program
{
    public static async Task Main()
    {
        var settings = new GanpaSettings()
        {
            AppName = "ganpa-onboarding-dotnet",
            UnleashApi = new Uri("<YOUR_API_URL>"),
            CustomHttpHeaders = new Dictionary<string, string>()
            {
                {"Authorization","<YOUR_API_TOKEN>"} // in production use environment variable
            }
        };

        var ganpa =  new DefaultGanpa(settings);

        while (true) {
            Console.WriteLine($"Flag is enabled: {ganpa.IsEnabled("<YOUR_FLAG>")}");
            await Task.Delay(1000);
        }
    }
}

```

---
```csharp
var settings = new GanpaSettings()
{
    AppName = "ganpa-onboarding-dotnet",
    GanpaApi = new Uri("<YOUR_API_URL>"),
    CustomHttpHeaders = new Dictionary<string, string>()
    {
        {"Authorization",Environment.GetEnvironmentVariable("GANPA_API_KEY")}
    }
};
```

---
- [SDK repository with documentation](https://github.com/Unleash/unleash-client-dotnet)
- [.NET/C# SDK example with CodeSandbox](https://github.com/Unleash/unleash-sdk-examples/tree/main/Csharp)
