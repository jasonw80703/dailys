## Users Collection
```
users
{
  id (pk str) {
    createdAt (str)
    displayName (str)
    email (str)
  }
}
```
#### Example
```
{
  "9Bu7sX9gb4TfLCneQE4YOMm5bP02" {
    createdAt: "2022-05-18T16:26:22-07:00"
    displayName: "testguy"
    email: "t@g.com"
  }
}
```

## Dailys Collection
```
dailys
{
  date (pk str) {
    prompt1 (str)
    prompt2 (str)
    prompt3 (str)
  }
}
```
#### Example
```
{
  "2022-05-20" {
    prompt1: "Brushed my teeth"
    prompt2: "Went for a walk"
    prompt3: "Took a nap"
  }
}
```

## UserDailys
```
userdailys
{
  id (pk str) {
    userId (str)
    dailyId (str)
    ans1 (bool)
    ans2 (bool)
    ans3 (bool)
  }
}
```
#### Example
```
{
  "abcd123" {
    userId: "9Bu7sX9gb4TfLCneQE4YOMm5bP02"
    dailyId: "2022-05-20"
    ans1: true
    ans2: true
    ans3: false
  }
}
```