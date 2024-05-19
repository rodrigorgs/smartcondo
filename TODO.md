# TODO

- Use database migrations
- Config deploy to build Angular frontend
- Create automated tests
- Maybe use Nx to manage monorepo and share code between backend and frontend
- Use slug in /condos/:id and all subpaths
- Create table: provider_account (e.g., ewelink, tuya etc.) -- link it to devices
- i18n, l10n

# Decisions

- All (or most) tables must have createdAt and updatedAt columns

# Scenario

- (b..) Admin logs in
- (bif) Admin creates a new condo
- (b..) Admin assigns a user to a condo as a manager
- (...) Manager generates a shared key for the condo (maybe)
- (b..) Manager creates a device
- (b..) Manager assigns a user to the condo as a resident
- (bi.) Resident creates a temporary access key for the condo and gives the corresponding URL to a visitor
- (b..) Visitor opens the URL and sees the devices
- (...) Visitor chooses a device and clicks on the button to open the door

Where to configure each step:

- backend
- insomnia
- frontend
