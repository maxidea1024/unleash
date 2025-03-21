1\. Install the SDK

```gradle
implementation("io.getunleash:ganpa-android:1")
```

2\. Enable required [permissions](https://developer.android.com/guide/topics/manifest/uses-permission-element)

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

2\. Initialize Ganpa in your application

```kotlin
class MyApplication: Application() {
    val ganpa: Ganpa by lazy {
        val instance = DefaultGanpa(
            androidContext = this,
            ganpaConfig = UnleashConfig.newBuilder(appName = "ganpa-onboarding-android")
                .proxyUrl("<YOUR_API_URL>")
                .clientKey("<YOUR_API_TOKEN>")
                .build()
        )
        instance.start()
        instance
    }

    override fun onTerminate() {
        super.onTerminate()
        ganpa.close()
    }
}
```

3\. Check flag status

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val unleashInstance = (application as MyApplication).ganpa

        setContent {
            var flagStatus by remember { mutableStateOf("loading") }
            LaunchedEffect(Unit) {
                while (isActive) {
                    val isFlagEnabled = unleashInstance.isEnabled("<YOUR_FLAG>")
                    flagStatus = if (isFlagEnabled) "enabled" else "disabled"
                    delay(3000L)
                }
            }

            Text(text = "Flag is $flagStatus!")
        }

    }
}
```
ℹ️ **Info:** The Android SDK takes at least 60 seconds to post metrics to Unleash.

---
---
- [SDK repository with documentation and example](https://github.com/Unleash/unleash-android)
- [Android SDK basic example](hhttps://github.com/Unleash/unleash-sdk-examples/tree/main/Android)
