> **Prototype note:** This existing flowchart is a conceptual workflow. The current project is front-end only; login, reservations, online payment, payment verification, and receipts are not connected to a backend and must not be treated as real transactions. See `docs/system-flowcharts.md` for the updated guest, renter, landlord, and administrator flows.

```mermaid
flowchart TD
    A([Start]) --> B[Open RentalWebApp]
    B --> C{Has an account?}
    C -- No --> D[Register Account]
    D --> E[Login]
    C -- Yes --> E

    E --> F{Valid Login?}
    F -- No --> G[Display Error Message]
    G --> E
    F -- Yes --> H[User Dashboard]

    H --> I[Browse Apartments]
    I --> J[Select Apartment]
    J --> K[View Apartment Details]
    K --> L[Explore 360-Degree View]
    L --> M{Interested in Renting?}

    M -- No --> I
    M -- Yes --> N[Check Availability]
    N --> O{Apartment Available?}

    O -- No --> P[Display Unavailable Status]
    P --> I
    O -- Yes --> Q[Submit Reservation Request]
    Q --> R{Request Approved?}

    R -- No --> S[Display Rejection or Pending Status]
    S --> H
    R -- Yes --> T[Proceed to Online Payment]
    T --> U[Select Payment Method]
    U --> V[Process Payment]
    V --> W{Payment Successful?}

    W -- No --> X[Display Payment Failure]
    X --> Y{Retry Payment?}
    Y -- Yes --> V
    Y -- No --> H

    W -- Yes --> Z[Verify Payment]
    Z --> AA[Generate Receipt]
    AA --> AB[Confirm Reservation]
    AB --> AC[Notify User]
    AC --> AD([End])
    ```