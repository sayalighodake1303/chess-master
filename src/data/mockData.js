// Mock Data for DevArchitect AI - Requirement to Software Design Generator

export const INITIAL_PROJECTS = [
  {
    id: "proj-food-01",
    name: "Online Food Delivery System",
    description: "An online platform connecting customers, restaurants and delivery partners for seamless food ordering, payment and live tracking.",
    domain: "E-Commerce / Logistics",
    targetPlatform: "Web + Mobile",
    techStack: "Node.js / React / PostgreSQL",
    lastUpdated: "10 mins ago",
    createdAt: "Aug 10, 2026",
    progress: 88,
    status: "Active",
    version: "v2.1",
    rawRequirement: `I want to build an online food delivery system where customers can browse restaurants, view menus, place food orders, make payments and track deliveries in real time. Restaurants should manage their menu items and process incoming orders. Delivery partners should receive delivery assignments and update delivery status.`,
    stats: {
      actors: 4,
      functionalRequirements: 18,
      nonFunctionalRequirements: 8,
      useCases: 12,
      entities: 9,
      apis: 14,
      architectureNodes: 7
    }
  },
  {
    id: "proj-college-02",
    name: "College Management System",
    description: "Comprehensive enterprise portal managing student enrollment, attendance tracking, exam grading, faculty schedules and fee receipts.",
    domain: "Education",
    targetPlatform: "Web",
    techStack: "Java / Spring Boot / PostgreSQL",
    lastUpdated: "Yesterday",
    createdAt: "Aug 05, 2026",
    progress: 65,
    status: "Draft",
    version: "v1.0",
    rawRequirement: `Build a college management system where students register for semester courses, view attendance, check examination results and pay fees. Faculty members record attendance, upload internal marks and manage course materials. Department heads approve course registrations and track faculty workloads.`,
    stats: {
      actors: 4,
      functionalRequirements: 22,
      nonFunctionalRequirements: 6,
      useCases: 15,
      entities: 11,
      apis: 18,
      architectureNodes: 6
    }
  },
  {
    id: "proj-health-03",
    name: "AI Healthcare Assistant",
    description: "Digital health platform offering AI symptom analysis, tele-consultation booking, electronic health records (EHR) and prescription management.",
    domain: "Healthcare",
    targetPlatform: "Web + Mobile",
    techStack: "Python / FastAPI / MongoDB",
    lastUpdated: "3 days ago",
    createdAt: "Jul 28, 2026",
    progress: 94,
    status: "Completed",
    version: "v3.0",
    rawRequirement: `An AI health assistant platform where patients input symptoms to receive preliminary guidance, schedule video consultations with certified doctors, store medical lab records securely and receive pill dosage reminders. Doctors issue e-prescriptions and access patient medical history with consent.`,
    stats: {
      actors: 3,
      functionalRequirements: 16,
      nonFunctionalRequirements: 10,
      useCases: 10,
      entities: 8,
      apis: 16,
      architectureNodes: 8
    }
  }
];

export const MOCK_ANALYSIS_DATA = {
  summary: {
    actorsCount: 4,
    frCount: 18,
    nfrCount: 8,
    entityCount: 9,
    apiCount: 14,
    overallCompleteness: 92,
    domainDetected: "Logistics & On-Demand Service"
  },
  actors: [
    {
      id: "actor-1",
      name: "Customer",
      type: "Primary Actor",
      description: "End user who browses food items, places orders, makes online payments, and tracks order delivery status.",
      icon: "User"
    },
    {
      id: "actor-2",
      name: "Restaurant Owner / Manager",
      type: "Secondary Actor",
      description: "Business entity managing menu catalog, setting pricing/availability, approving incoming orders, and managing outlet hours.",
      icon: "Store"
    },
    {
      id: "actor-3",
      name: "Delivery Partner",
      type: "Secondary Actor",
      description: "Logistics driver receiving pickup notifications, managing active orders, navigating routes, and marking drop-off fulfillment.",
      icon: "Bike"
    },
    {
      id: "actor-4",
      name: "System Administrator",
      type: "Administrative Actor",
      description: "Platform operator overseeing account verifications, commission billing, conflict resolution, and platform health.",
      icon: "ShieldCheck"
    }
  ],
  functionalRequirements: [
    {
      id: "FR-001",
      title: "User Registration & Authentication",
      description: "Customers, restaurant staff, and delivery partners must register and securely log in via Email/Password or OAuth (Google, Phone OTP).",
      priority: "High",
      category: "Authentication",
      complexity: "Moderate",
      actors: ["Customer", "Restaurant Owner", "Delivery Partner"]
    },
    {
      id: "FR-002",
      title: "Browse & Search Restaurants",
      description: "Customers must be able to search restaurants by name, cuisine, rating, dietary preference, and geographical distance.",
      priority: "High",
      category: "Discovery",
      complexity: "Moderate",
      actors: ["Customer"]
    },
    {
      id: "FR-003",
      title: "Interactive Menu Catalog & Cart",
      description: "Customers can view menu items with images, add custom add-ons/variations, modify quantities, and hold items in a shopping cart.",
      priority: "High",
      category: "Ordering",
      complexity: "Simple",
      actors: ["Customer"]
    },
    {
      id: "FR-004",
      title: "Order Placement & Price Calculation",
      description: "System must calculate item totals, taxes, delivery fees, and promo code discounts upon checkout confirmation.",
      priority: "High",
      category: "Ordering",
      complexity: "Moderate",
      actors: ["Customer"]
    },
    {
      id: "FR-005",
      title: "Multi-Gateway Online Payment",
      description: "System must integrate secure digital payment options (Stripe, Credit Card, UPI, Digital Wallet) and generate payment receipts.",
      priority: "High",
      category: "Payment",
      complexity: "Complex",
      actors: ["Customer"]
    },
    {
      id: "FR-006",
      title: "Restaurant Menu Management",
      description: "Restaurant managers must be able to create, update, disable, or price-adjust menu items and food categories.",
      priority: "High",
      category: "Catalog Management",
      complexity: "Simple",
      actors: ["Restaurant Owner"]
    },
    {
      id: "FR-007",
      title: "Order Acceptance & Preparation Workflow",
      description: "Restaurants receive real-time notifications for new orders and can mark status as Accepted, Preparing, or Ready for Pickup.",
      priority: "High",
      category: "Fulfillment",
      complexity: "Moderate",
      actors: ["Restaurant Owner"]
    },
    {
      id: "FR-008",
      title: "Automated Delivery Partner Dispatch",
      description: "System algorithm assigns nearby available delivery partners based on proximity to the pickup location.",
      priority: "High",
      category: "Logistics",
      complexity: "Complex",
      actors: ["Delivery Partner", "System Administrator"]
    },
    {
      id: "FR-009",
      title: "Real-time Order & Delivery Tracking",
      description: "Customers and support agents can track driver live GPS location and view estimated time of arrival (ETA).",
      priority: "Medium",
      category: "Tracking",
      complexity: "Complex",
      actors: ["Customer", "Delivery Partner"]
    },
    {
      id: "FR-010",
      title: "Rating & Review Feedback System",
      description: "Customers can rate food quality (1-5 stars) and driver delivery experience with optional text reviews.",
      priority: "Medium",
      category: "Feedback",
      complexity: "Simple",
      actors: ["Customer"]
    },
    {
      id: "FR-011",
      title: "Push Notifications & Order Alerts",
      description: "Send automated SMS and app push updates for order placement, preparation ready status, and delivery arrival.",
      priority: "Medium",
      category: "Notifications",
      complexity: "Moderate",
      actors: ["Customer", "Restaurant Owner", "Delivery Partner"]
    },
    {
      id: "FR-012",
      title: "Platform Admin Revenue Dashboard",
      description: "Admins view total platform GMV, restaurant payout breakdown, platform commission percentages, and order dispute logs.",
      priority: "Low",
      category: "Analytics",
      complexity: "Moderate",
      actors: ["System Administrator"]
    }
  ],
  nonFunctionalRequirements: [
    {
      id: "NFR-001",
      title: "Response Time Efficiency",
      category: "Performance",
      description: "API response time for menu queries and restaurant listings must be under 200ms at 95th percentile.",
      metric: "< 200ms latency"
    },
    {
      id: "NFR-002",
      title: "High Concurrency Support",
      category: "Scalability",
      description: "System architecture must handle at least 5,000 active concurrent orders during peak dining hours.",
      metric: "5,000 concurrent ops"
    },
    {
      id: "NFR-003",
      title: "Data Encryption & PCI-DSS Compliance",
      category: "Security",
      description: "All sensitive customer credentials and payment payload transit must use TLS 1.3 encryption.",
      metric: "AES-256 / TLS 1.3"
    },
    {
      id: "NFR-004",
      title: "High Service Availability",
      category: "Reliability",
      description: "System uptime must guarantee 99.9% availability annually with active-active failover database replicas.",
      metric: "99.9% uptime SLA"
    },
    {
      id: "NFR-005",
      title: "Mobile Responsiveness & Usability",
      category: "Usability",
      description: "UI interfaces must render within 1.5 seconds on 3G mobile networks following WCAG 2.1 AA guidelines.",
      metric: "< 1.5s load time"
    },
    {
      id: "NFR-006",
      title: "Real-time Sync Latency",
      category: "Real-time",
      description: "GPS coordinate broadcast from delivery partner app must update customer map view within 2 seconds.",
      metric: "< 2s map sync"
    }
  ],
  useCases: [
    {
      id: "UC-01",
      title: "Place Food Order",
      actor: "Customer",
      summary: "Customer selects menu items, enters delivery address, selects payment method, and confirms order.",
      preConditions: "Customer is authenticated and items exist in cart.",
      postConditions: "Order record is saved with state 'PENDING_RESTAURANT', payment hold authorized, push notification sent to restaurant.",
      steps: [
        "Customer opens active shopping cart and clicks Checkout.",
        "System validates item availability with restaurant catalog.",
        "Customer confirms delivery address and applies coupon code.",
        "System calculates taxes, delivery surcharge, and final total.",
        "Customer submits payment details and authorizes charge.",
        "System emits 'OrderPlacedEvent' and redirects customer to tracking view."
      ]
    },
    {
      id: "UC-02",
      title: "Process Incoming Order",
      actor: "Restaurant Owner",
      summary: "Restaurant receives order alert, checks prep capacity, and marks acceptance or rejection.",
      preConditions: "Order is in PENDING_RESTAURANT status.",
      postConditions: "Order status changes to PREPARING; prep timer begins; customer notified.",
      steps: [
        "Restaurant terminal displays ringing alert with item breakdown.",
        "Manager reviews order list and estimated prep time (e.g. 25 mins).",
        "Manager clicks Accept Order button.",
        "System updates order status to PREPARING and notifies customer."
      ]
    },
    {
      id: "UC-03",
      title: "Accept Delivery Assignment",
      actor: "Delivery Partner",
      summary: "Delivery driver gets trip request broadcast based on GPS location and accepts assignment.",
      preConditions: "Order status is PREPARING or READY_FOR_PICKUP.",
      postConditions: "Driver assigned to order ID; navigation route to restaurant initiated.",
      steps: [
        "Driver mobile app displays popup with pickup distance & earnings.",
        "Driver taps Accept Delivery within 30-second window.",
        "System locks assignment and generates GPS turn-by-turn route.",
        "System updates customer with driver details & contact info."
      ]
    },
    {
      id: "UC-04",
      title: "Update Menu Inventory",
      actor: "Restaurant Owner",
      summary: "Restaurant staff marks out-of-stock dishes or updates prices.",
      preConditions: "Staff is logged into Restaurant Portal.",
      postConditions: "Menu item status updated immediately across all customer catalog searches.",
      steps: [
        "Staff navigates to Menu Management tab.",
        "Staff toggles 'In Stock' switch to Off for specific dish.",
        "System purges item from active search caches."
      ]
    }
  ],
  database: {
    tables: [
      {
        name: "CUSTOMERS",
        description: "Stores customer account info, contact details and default address.",
        columns: [
          { name: "customer_id", type: "UUID", isPk: true, isFk: false, desc: "Primary key identifier" },
          { name: "full_name", type: "VARCHAR(100)", isPk: false, isFk: false, desc: "Customer full name" },
          { name: "email", type: "VARCHAR(150)", isPk: false, isFk: false, desc: "Unique user email" },
          { name: "phone", type: "VARCHAR(20)", isPk: false, isFk: false, desc: "Contact phone number" },
          { name: "created_at", type: "TIMESTAMP", isPk: false, isFk: false, desc: "Account creation timestamp" }
        ]
      },
      {
        name: "RESTAURANTS",
        description: "Stores registered restaurant partner profiles and operating hours.",
        columns: [
          { name: "restaurant_id", type: "UUID", isPk: true, isFk: false, desc: "Primary key identifier" },
          { name: "name", type: "VARCHAR(120)", isPk: false, isFk: false, desc: "Restaurant brand name" },
          { name: "cuisine_type", type: "VARCHAR(50)", isPk: false, isFk: false, desc: "Italian, Indian, Asian, etc." },
          { name: "address", type: "TEXT", isPk: false, isFk: false, desc: "Physical outlet location" },
          { name: "is_active", type: "BOOLEAN", isPk: false, isFk: false, desc: "Current open status" }
        ]
      },
      {
        name: "MENU_ITEMS",
        description: "Individual food dishes tied to a specific restaurant catalog.",
        columns: [
          { name: "item_id", type: "UUID", isPk: true, isFk: false, desc: "Primary key" },
          { name: "restaurant_id", type: "UUID", isPk: false, isFk: true, desc: "Foreign Key -> RESTAURANTS" },
          { name: "dish_name", type: "VARCHAR(100)", isPk: false, isFk: false, desc: "Item display title" },
          { name: "price", type: "DECIMAL(10,2)", isPk: false, isFk: false, desc: "Price per portion" },
          { name: "is_available", type: "BOOLEAN", isPk: false, isFk: false, desc: "Stock status tag" }
        ]
      },
      {
        name: "ORDERS",
        description: "Main transaction ledger holding customer orders.",
        columns: [
          { name: "order_id", type: "UUID", isPk: true, isFk: false, desc: "Unique order identifier" },
          { name: "customer_id", type: "UUID", isPk: false, isFk: true, desc: "Foreign Key -> CUSTOMERS" },
          { name: "restaurant_id", type: "UUID", isPk: false, isFk: true, desc: "Foreign Key -> RESTAURANTS" },
          { name: "status", type: "VARCHAR(30)", isPk: false, isFk: false, desc: "PLACED, PREPARING, OUT_FOR_DELIVERY, COMPLETED" },
          { name: "total_amount", type: "DECIMAL(10,2)", isPk: false, isFk: false, desc: "Final order cost sum" },
          { name: "order_timestamp", type: "TIMESTAMP", isPk: false, isFk: false, desc: "Time of order authorization" }
        ]
      },
      {
        name: "DELIVERY_PARTNERS",
        description: "Registered drivers for order fulfillment.",
        columns: [
          { name: "partner_id", type: "UUID", isPk: true, isFk: false, desc: "Primary key identifier" },
          { name: "driver_name", type: "VARCHAR(100)", isPk: false, isFk: false, desc: "Full name" },
          { name: "vehicle_type", type: "VARCHAR(40)", isPk: false, isFk: false, desc: "Bike, Scooter, Car" },
          { name: "phone", type: "VARCHAR(20)", isPk: false, isFk: false, desc: "Contact number" },
          { name: "is_available", type: "BOOLEAN", isPk: false, isFk: false, desc: "Active online state" }
        ]
      },
      {
        name: "DELIVERY_TASKS",
        description: "Logistics tracking connecting orders with delivery drivers.",
        columns: [
          { name: "task_id", type: "UUID", isPk: true, isFk: false, desc: "Primary key" },
          { name: "order_id", type: "UUID", isPk: false, isFk: true, desc: "Foreign Key -> ORDERS" },
          { name: "partner_id", type: "UUID", isPk: false, isFk: true, desc: "Foreign Key -> DELIVERY_PARTNERS" },
          { name: "pickup_time", type: "TIMESTAMP", isPk: false, isFk: false, desc: "Timestamp picked up" },
          { name: "delivered_time", type: "TIMESTAMP", isPk: false, isFk: false, desc: "Timestamp handed over" }
        ]
      }
    ],
    sqlSnippet: `-- DevArchitect AI Generated Database Schema
-- Target: PostgreSQL 15+

CREATE TABLE customers (
    customer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE restaurants (
    restaurant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(120) NOT NULL,
    cuisine_type VARCHAR(50),
    address TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE menu_items (
    item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
    dish_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_available BOOLEAN DEFAULT true
);

CREATE TABLE orders (
    order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(customer_id),
    restaurant_id UUID REFERENCES restaurants(restaurant_id),
    status VARCHAR(30) DEFAULT 'PLACED',
    total_amount DECIMAL(10, 2) NOT NULL,
    order_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE delivery_partners (
    partner_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_name VARCHAR(100) NOT NULL,
    vehicle_type VARCHAR(40),
    phone VARCHAR(20) UNIQUE NOT NULL,
    is_available BOOLEAN DEFAULT true
);

CREATE TABLE delivery_tasks (
    task_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(order_id) ON DELETE CASCADE,
    partner_id UUID REFERENCES delivery_partners(partner_id),
    pickup_time TIMESTAMP WITH TIME ZONE,
    delivered_time TIMESTAMP WITH TIME ZONE
);`
  },
  apis: [
    {
      id: "api-01",
      method: "POST",
      endpoint: "/api/v1/auth/register",
      title: "User Account Registration",
      summary: "Registers a new customer, restaurant manager, or delivery partner.",
      authRequired: false,
      requestBody: `{
  "email": "customer@example.com",
  "password": "SecurePassword123!",
  "fullName": "Alex Morgan",
  "role": "CUSTOMER",
  "phone": "+14155552671"
}`,
      responseJson: `{
  "success": true,
  "data": {
    "userId": "usr_99812a3b",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}`
    },
    {
      id: "api-02",
      method: "GET",
      endpoint: "/api/v1/restaurants",
      title: "List & Search Restaurants",
      summary: "Fetches paginated list of active restaurants filtered by cuisine, rating, and radius.",
      authRequired: false,
      requestBody: "QueryParams: ?cuisine=Italian&lat=37.7749&lng=-122.4194&radius=5km",
      responseJson: `{
  "count": 24,
  "restaurants": [
    {
      "restaurantId": "rst_4412",
      "name": "Luigi's Trattoria",
      "cuisine": "Italian",
      "rating": 4.8,
      "estimatedDeliveryMins": 25
    }
  ]
}`
    },
    {
      id: "api-03",
      method: "POST",
      endpoint: "/api/v1/orders",
      title: "Create Food Order",
      summary: "Submits cart items, calculates delivery fees, and locks order for payment authorization.",
      authRequired: true,
      requestBody: `{
  "restaurantId": "rst_4412",
  "items": [
    { "itemId": "itm_991", "quantity": 2, "options": ["Extra Cheese"] }
  ],
  "deliveryAddressId": "addr_881",
  "paymentMethod": "STRIPE_CARD"
}`,
      responseJson: `{
  "orderId": "ord_77610",
  "status": "PENDING_PAYMENT",
  "subtotal": 34.50,
  "tax": 3.10,
  "deliveryFee": 3.99,
  "grandTotal": 41.59
}`
    },
    {
      id: "api-04",
      method: "PATCH",
      endpoint: "/api/v1/orders/{orderId}/status",
      title: "Update Order Workflow Status",
      summary: "Allows restaurant staff or delivery driver to advance order lifecycle state.",
      authRequired: true,
      requestBody: `{
  "status": "PREPARING",
  "estimatedPrepMinutes": 20
}`,
      responseJson: `{
  "orderId": "ord_77610",
  "previousStatus": "PLACED",
  "currentStatus": "PREPARING",
  "updatedAt": "2026-08-13T14:32:00Z"
}`
    },
    {
      id: "api-05",
      method: "GET",
      endpoint: "/api/v1/deliveries/{orderId}/track",
      title: "Live GPS Tracking",
      summary: "Retrieves driver's latest coordinates and real-time route path.",
      authRequired: true,
      requestBody: "PathParameter: orderId = ord_77610",
      responseJson: `{
  "orderId": "ord_77610",
  "driver": {
    "name": "David Miller",
    "phone": "+14155559812",
    "currentLocation": { "lat": 37.7751, "lng": -122.4180 }
  },
  "etaMinutes": 8
}`
    }
  ],
  architecture: {
    layers: [
      {
        id: "client-layer",
        name: "Client Layer",
        color: "indigo",
        nodes: [
          { id: "web-app", name: "React Web App", type: "Frontend", desc: "Customer & Admin Web Portal" },
          { id: "mobile-app", name: "React Native Mobile App", type: "Mobile", desc: "Customer & Driver iOS/Android Apps" }
        ]
      },
      {
        id: "gateway-layer",
        name: "Gateway & Auth Layer",
        color: "cyan",
        nodes: [
          { id: "api-gateway", name: "Kong API Gateway", type: "Gateway", desc: "Rate limiting, SSL termination, route proxy" },
          { id: "auth-service", name: "OAuth 2.0 Auth Service", type: "Microservice", desc: "JWT token validation & user RBAC" }
        ]
      },
      {
        id: "services-layer",
        name: "Microservices Layer",
        color: "emerald",
        nodes: [
          { id: "order-service", name: "Order Processing Service", type: "Microservice", desc: "State machine for order placements" },
          { id: "catalog-service", name: "Restaurant Catalog Service", type: "Microservice", desc: "Menu search & inventory cache" },
          { id: "delivery-service", name: "Dispatch & Logistics Service", type: "Microservice", desc: "Geo-matching algorithm & tracking" },
          { id: "payment-service", name: "Payment Gateway Service", type: "Microservice", desc: "Stripe & digital wallet adapter" },
          { id: "notification-service", name: "Notification & Push Service", type: "Microservice", desc: "WebSockets, Firebase FCM & SMS" }
        ]
      },
      {
        id: "data-layer",
        name: "Data & Storage Layer",
        color: "purple",
        nodes: [
          { id: "primary-db", name: "PostgreSQL Primary Cluster", type: "Database", desc: "Relational transactional storage" },
          { id: "redis-cache", name: "Redis In-Memory Cache", type: "Cache", desc: "Menu caching & active socket sessions" },
          { id: "kafka-bus", name: "Apache Kafka Event Bus", type: "Message Queue", desc: "Asynchronous event streams" }
        ]
      }
    ]
  },
  projectStructure: {
    tree: [
      {
        name: "food-delivery-backend",
        type: "folder",
        children: [
          {
            name: "src",
            type: "folder",
            children: [
              {
                name: "controllers",
                type: "folder",
                children: [
                  { name: "OrderController.ts", type: "file", language: "typescript" },
                  { name: "RestaurantController.ts", type: "file", language: "typescript" },
                  { name: "DeliveryController.ts", type: "file", language: "typescript" }
                ]
              },
              {
                name: "services",
                type: "folder",
                children: [
                  { name: "OrderService.ts", type: "file", language: "typescript" },
                  { name: "GeoDispatchService.ts", type: "file", language: "typescript" },
                  { name: "PaymentService.ts", type: "file", language: "typescript" }
                ]
              },
              {
                name: "models",
                type: "folder",
                children: [
                  { name: "Order.entity.ts", type: "file", language: "typescript" },
                  { name: "Customer.entity.ts", type: "file", language: "typescript" },
                  { name: "DeliveryTask.entity.ts", type: "file", language: "typescript" }
                ]
              },
              { name: "server.ts", type: "file", language: "typescript" }
            ]
          },
          { name: "docker-compose.yml", type: "file", language: "yaml" },
          { name: "package.json", type: "file", language: "json" },
          { name: "README.md", type: "file", language: "markdown" }
        ]
      }
    ],
    sampleFiles: {
      "OrderController.ts": `import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';

export class OrderController {
  private orderService = new OrderService();

  public createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const customerId = req.user.id;
      const orderPayload = req.body;
      const order = await this.orderService.processNewOrder(customerId, orderPayload);
      res.status(201).json({ success: true, order });
    } catch (error) {
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  };

  public getLiveTracking = async (req: Request, res: Response): Promise<void> => {
    const { orderId } = req.params;
    const trackingInfo = await this.orderService.getDriverGPSLocation(orderId);
    res.json(trackingInfo);
  };
}`,
      "GeoDispatchService.ts": `export class GeoDispatchService {
  /**
   * Finds nearest active delivery partner within a 3km radius
   */
  public async findOptimalDriver(pickupLat: number, pickupLng: number): Promise<string> {
    // Geo-spatial radial search using Redis GEORADIUS or PostgreSQL PostGIS
    console.log(\`Searching drivers near \${pickupLat}, \${pickupLng}\`);
    return "partner_driver_9912";
  }
}`,
      "docker-compose.yml": `version: '3.8'
services:
  api-gateway:
    build: ./src
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/food_delivery
      - REDIS_HOST=redis
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: food_delivery
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"`
    }
  },
  changeImpact: {
    oldRequirement: "Customers can place food orders and pay online.",
    newRequirement: "Customers can place food orders and delivery partners can accept delivery assignments with live GPS tracking updates.",
    impactLevel: "HIGH",
    impactScore: 85,
    summary: "Requirement modification introduces a new actor (Delivery Partner), 3 new functional requirements, 1 new entity, 3 new API endpoints, and a WebSockets real-time push component in the system architecture.",
    affectedComponents: [
      { name: "Functional Requirements", status: "Modified", count: "3 Added, 1 Updated", isAffected: true },
      { name: "Use Cases", status: "Modified", count: "UC-03 & UC-05 Added", isAffected: true },
      { name: "Class Diagram", status: "Modified", count: "DeliveryTask entity added", isAffected: true },
      { name: "Database Schema", status: "Modified", count: "2 new tables (delivery_partners, delivery_tasks)", isAffected: true },
      { name: "API Specification", status: "Modified", count: "3 new endpoints (/deliveries/*)", isAffected: true },
      { name: "System Architecture", status: "Modified", count: "Added Notification & Push Service (WebSockets)", isAffected: true },
      { name: "Project Structure", status: "Modified", count: "Added GeoDispatchService.ts", isAffected: true }
    ],
    graphNodes: [
      { id: "req-change", name: "Requirement Change", status: "source" },
      { id: "actor-dp", name: "Delivery Partner Actor", status: "added" },
      { id: "uc-dp", name: "UC-03: Accept Delivery", status: "added" },
      { id: "db-dt", name: "Table: delivery_tasks", status: "added" },
      { id: "api-track", name: "PATCH /deliveries/status", status: "added" },
      { id: "arch-ws", name: "WebSocket Push Server", status: "modified" }
    ]
  },
  versionHistory: [
    {
      version: "v2.1",
      date: "13 Aug 2026",
      author: "Lead Architect",
      commitMessage: "Added live GPS tracking & delivery partner dispatch engine",
      changes: ["Added delivery partner workflow", "Added real-time map WebSocket endpoint", "Updated database schema with delivery_tasks table"],
      isCurrent: true
    },
    {
      version: "v2.0",
      date: "11 Aug 2026",
      author: "System AI",
      commitMessage: "Integrated online payment gateway & restaurant order acceptance",
      changes: ["Added Stripe Payment Gateway API", "Added Restaurant Menu Management FRs"],
      isCurrent: false
    },
    {
      version: "v1.0",
      date: "10 Aug 2026",
      author: "Product Manager",
      commitMessage: "Initial baseline requirements breakdown for food ordering",
      changes: ["Baseline requirements uploaded", "4 Core Actors identified"],
      isCurrent: false
    }
  ]
};
