# node-file-config

Automatically read config from files for a project. If changes are made to the config files, a new copy of config is fetched next time.

**Usage:**

```
var fileConfig = require("node-file-config");
var config = new fileConfig("<project_name>");
console.log(config.get(userConfig, files));
```

- `userConfig`: Optional. If any user config is provided it will not be overridden and will just combine with the config read from the files.
- `files`: Additional config files array if you want to look for config in more files.

The module checks for these config files automatically even if no additional files are provided:

- ../../<project_folder_name>.js
- ../<project_folder_name>.js
- ./<project_folder_name>.js
- ../../<project_name>.js
- ../<project_name>.js
- ./<project_name>.js
- ./config.js
- <project_name>.js
- config.js

The priority of config is decided in the same order. But, if you specify extra config `files` as mentioned above, they will have top priority in the order of array provided.

All data gets combined with `userConfig` from all the found config files.

---------------------------------------

**Example:**

Files...

../../<project_name>.js

```
exports = module.exports = function() {
  return {
    test1: "test123", // different than user config, check below
    test2: "test456", // different than user config, check below
    test3: "test3"
  }
};
```

./<project_name>.js

```
exports = module.exports = function() {
  return {
    test3: "test10", // different than the previous config file
    test4: "test4",
    test5: "test5"
  }
};
```

./config.js

```
exports = module.exports = function() {
  return {
    test5: "test50", // different than the previous config file
    test6: "test6",
    test7: "test7"
  }
};
```

Let's fetch...

```
var fileConfig = require("node-file-config");
var config = new fileConfig("<project_name>");
console.log(config.get({test1: "test1", test2: "test2"}));
```

Will give...

```
{
  test1: "test1",
  test2: "test2",
  test3: "test3",
  test4: "test4",
  test5: "test5",
  test6: "test6",
  test7: "test7"
}
```

Now, let's say you made changes on the go...

../../<project_name>.js

```
exports = module.exports = function() {
  return {
    test1: "test123", // different than user config, check below
    test2: "test456", // different than user config, check below
    test3: "test3",
    test5: "testChanged",
    test8: "testNew"
  }
};
```

When fetching again next time while project is still running...


```
console.log(config.get({test1: "test1", test2: "test2"}));
```

Will give...

```
{
  test1: "test1",
  test2: "test2",
  test3: "test3",
  test4: "test4",
  test5: "testChanged",
  test6: "test6",
  test7: "test7",
  test8: "testNew"
}
```