# Gitlab Merge Request FLow

## What is
A tool for do following thing just one command line: 
 1. rebase remote branch, then
 2. push local branch, then
 3. create merge request, then
 4. merge it
 
# How
0. install `npm install gitlab-merge-request-flow`
1. config your gitlab info: 
```json
{
  "project_name_a": {
    "workingBranch": "daily/jituanlin",
    "targetBranch": "develop",
    "projectId": 42,
    "gitlabToken": "xxx",
    "gitlabHost": "http://xxx.xxx.xxx",
    "workingDir": "/xxx/xxx/xxx"
  }
}
```
The `project_name_a` is a project name. You can config multiple projects
and distinguish by project name.   
2. run command `gmrf /project_name_a /your_config_path` for execute the flow(
see *What is* section for detail);
The `project_name_a /your_config_path` is where you put your config file,
default to ` ~/.config/glmr/config.json`

## Why
0. A **real** example for **functional programming**(with `fp-ts` and `tagless final`) 
1. Get rid of the tedious work of pushing your code to the "main" branch.

## See also
[Tag Less Final introduction](https://dev.to/gcanti/functional-design-tagless-final-332k)

[FP-TS To Max](https://github.com/gcanti/fp-ts/blob/master/tutorials/fp-ts-to-the-max-II.ts)


## Note
Make sure know what you do before run it, *SPECIALLY WHEN YOUR REPOSITORY INTEGRATED WITH CI*.
