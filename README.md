# Front Livraison

This is the front-end application for the delivery management system.

## Architecture

The application is built with Angular using a modular architecture with five main feature modules:

1. **ClientModule** – for customers to view their orders and submit reclamations.
2. **DeliveryModule** – for delivery agents to see assigned orders, addresses, client name & phone.
3. **EnterpriseModule** – for companies to view all their orders with live status, and manage client reclamations.
4. **ParticulierModule** – for private partners to manage orders they oversee.
5. **AdminModule** – super-admin area to manage everything (users, roles, settings).

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd front_livraison
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200/`.

## Development

### Build

To build the project:

```bash
npm run build
```

### Running tests

To run tests:

```bash
npm test
```

### Linting

To lint the code:

```bash
npm run lint
```

## Features

### Subscription & Trial

The Enterprise & Admin modules include a 15-day free trial, followed by a monthly subscription model. The `SubscriptionService` manages this functionality.

### User Roles

The application supports several user roles:

- **Client**: Regular customers
- **Delivery**: Delivery agents
- **Enterprise**: Business clients with multiple orders
- **Particulier**: Private delivery partners
- **Admin**: System administrators

Each role has specific access permissions managed through the `AuthGuard`.

## Environments

The application uses two environment configurations:

- `environment.dev.ts`: Development environment settings
- `environment.prod.ts`: Production environment settings

## Project Structure

```
src/
├── app/
│   ├── admin/           # Admin module
│   ├── client/          # Client module
│   ├── core/            # Core services and guards
│   ├── delivery/        # Delivery module
│   ├── enterprise/      # Enterprise module
│   ├── particulier/     # Particulier module
│   ├── shared/          # Shared components and utilities
│   ├── app.component.*  # Main app component
│   ├── app.config.ts    # App configuration
│   └── app.routes.ts    # Main routing
├── assets/              # Static assets
├── environments/        # Environment configurations
└── styles.scss          # Global styles
```

## License

[License information]
