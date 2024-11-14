# vis-powerdaemon

A workflow enabling your GitHub Action to send requests to a Pterodactyl panel-compatible API.

## Description

This GitHub Action allows you to execute power actions (start, stop, restart, kill) on a Pterodactyl Panel instance or compatible API.

## Usage

### Inputs

- `PANEL_URL`: URL of the Pterodactyl panel (required)
- `API_KEY`: Bearer token for panel authorization (required)
- `SERVER_ID`: ID of the server to perform actions on (required)
- `POWER_ACTION`: Power action to perform (options: "start", "stop", "restart", "kill"). Default is "restart".

### Action Configuration

```yaml
name: "vis-powerdaemon"
description: "Execute power actions on a Pterodactyl Panel instance or compatible API."
author: "VI Software"

inputs:
    PANEL_URL:
        description: "URL of the Pterodactyl panel"
        required: true

    API_KEY:
        description: "Bearer token for panel authorization"
        required: true

    SERVER_ID:
        description: "ID of the server to perform actions on"
        required: true

    POWER_ACTION:
        description: 'Power action to perform (options: "start", "stop", "restart", "kill")'
        required: false
        default: "restart"

runs:
    using: "node20"
    main: "dist/index.js"

branding:
    icon: "power"
    color: "green"
```

### Development

```bash
npm run build
```

### License 

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

