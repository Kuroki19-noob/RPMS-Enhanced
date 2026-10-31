# Staylokal Rental Apartment Prototype — System Flowcharts

> **Prototype note:** These diagrams describe the intended front-end demonstration. Login/role selection, listing approval, inquiries, bookings, and payment statuses are not backed by a server or database. Do not use this prototype for real authentication or payment.

## 1. Guest and Renter Flow

```mermaid
flowchart TD
    A([Start]) --> B[Open public website]
    B --> C[Browse apartment listings]
    C --> D[Select an apartment]
    D --> E[View apartment details and rental price]
    E --> F[Explore 360-degree panorama]
    F --> G{Want to save or contact owner?}
    G -- No --> C
    G -- Yes --> H{Registered renter?}
    H -- No / guest --> I[Choose login or registration]
    I --> J[Prototype role links only; no real authentication]
    H -- Yes --> K[Open renter dashboard]
    K --> L{Choose action}
    L -- Save --> M[Simulate saved apartment]
    L -- Inquiry --> N[Open inquiry page / demo inquiry]
    L -- Booking --> O[Simulate booking request]
    M --> P([End])
    N --> P
    O --> Q[Display sample booking status]
    Q --> P
```

## 2. Landlord Flow

```mermaid
flowchart TD
    A([Start]) --> B[Open login page or choose landlord prototype link]
    B --> C[Open landlord dashboard]
    C --> D[View summary: listings, requests, inquiries]
    D --> E{Manage apartments?}
    E -- Yes --> F[Add a demo listing or change availability]
    F --> G[Enter listing details and optional panorama path]
    G --> H[Update page-only sample listing]
    H --> D
    E -- No --> I{Review requests?}
    I -- Yes --> J[View sample booking requests]
    J --> K{Accept or reject?}
    K -- Accept --> L[Mark request Approved]
    K -- Reject --> M[Mark request Rejected]
    L --> D
    M --> D
    I -- No --> N[Review inquiry and payment-status examples]
    N --> O[Return to public website / logout link]
    O --> P([End])
```

## 3. Administrator Flow

```mermaid
flowchart TD
    A([Start]) --> B[Open login page or choose admin prototype link]
    B --> C[Open admin dashboard]
    C --> D[View platform-wide sample statistics]
    D --> E[Review renter and landlord accounts]
    E --> F{Change sample account status?}
    F -- Yes --> G[Activate or deactivate row in current page]
    F -- No --> H[Review submitted apartment listings]
    G --> H
    H --> I{Listing decision}
    I -- Approve --> J[Set listing status to Approved]
    I -- Reject --> K[Set listing status to Rejected]
    I -- Needs review --> L[Set listing status to Pending]
    J --> M[Monitor bookings and inquiries]
    K --> M
    L --> M
    M --> N[View platform information]
    N --> O[Return to public website / logout link]
    O --> P([End])
```

## 4. Overall System Navigation

```mermaid
flowchart TD
    A([Start]) --> B[Open Staylokal public website]
    B --> C{Visitor role / destination?}
    C -- Guest --> D[Browse listings and apartment details]
    D --> E[Explore 360 panorama]
    E --> F{Need renter-only action?}
    F -- No --> D
    F -- Yes --> G[Login or registration page]
    C -- Renter --> H[Renter dashboard]
    C -- Landlord --> I[Landlord dashboard]
    C -- Administrator --> J[Admin dashboard]
    G --> K[Prototype role link; not secure authentication]
    K --> H
    K --> I
    K --> J
    H --> L[Saved apartments, inquiries, bookings]
    I --> M[Manage own listings and requests]
    M --> N{Listing status update?}
    N -- Submit / update --> O[Sample listing status shown]
    O --> I
    J --> P[Review all users and listings]
    P --> Q{Approve listing?}
    Q -- Yes --> R[Set Approved in demo interface]
    Q -- No --> S[Set Rejected or Pending in demo interface]
    R --> J
    S --> J
    L --> T[Payment status is display-only; no real payment]
    T --> U([End])
    D --> U
```
