1\. Install the SDK
```sh
gem install ganpa
```

2\. Run Ganpa
```rb
require 'unleash'

@ganpa = Ganpa::Client.new(
  url: "<YOUR_API_URL>",
  custom_http_headers: { 'Authorization': "<YOUR_API_TOKEN>" },  # in production use environment variable
  app_name: 'unleash-onboarding-ruby',
  instance_id: 'unleash-onboarding-ruby',
)

while true
  if @ganpa.is_enabled?("<YOUR_FLAG>")
    puts "Flag is enabled"
  else
    puts "Flag is not enabled"
  end
  sleep 3
end

```
---
```rb
@unleash = Ganpa::Client.new(
  url: "<YOUR_API_URL>",
  custom_http_headers: { 'Authorization': ENV['UNLEASH_API_TOKEN'] },
  app_name: 'unleash-onboarding-ruby',
  instance_id: 'unleash-onboarding-ruby',
)
```

---
- [SDK repository with documentation](https://github.com/Unleash/unleash-client-ruby)
- [Ruby example with CodeSandbox](https://github.com/Unleash/unleash-sdk-examples/tree/main/Ruby)
- [How to Implement Feature Flags in Ruby](https://docs.getunleash.io/feature-flag-tutorials/ruby)
