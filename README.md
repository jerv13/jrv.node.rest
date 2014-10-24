WIP: Unstable
------
** Technical Tasks **
- [x] Routing to controller using configuration
- [x] Centralized configuration files
- [/] Logging
    - Need logging that is available outside of res and req objects
- [/] Support for mongoDb
- [ ] Support for oauth
    - Local auth
    - Third party auth

- Specific implementations
    - [ ] User
        - Account (username, password, email)
        - Profile (needs to be extensible, IE: any module should be able to add a section to the profile)
    - [ ] ACL
        - Arbitrary definition VIA data-source
        - Resource to role
            - Resource (defined by code and registered in data-source)
            - Role (defined in data source)
            - Relation (defined in data-source)
