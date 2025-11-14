# Ridely 🚗

A modern carpooling mobile application built with Expo Router, React Native, Redux Toolkit, and Supabase. Ridely connects drivers with passengers for shared rides, similar to BlaBlaCar.

## 🚀 Features

- Ride Sharing: Create and join rides with real-time updates
- User Profiles: Comprehensive driver and passenger profiles with ratings
- Secure Payments: Integrated payment system with transaction history
- Real-time Chat: In-app messaging between drivers and passengers
- Smart Matching: AI-powered ride matching based on preferences
- Route Optimization: Efficient route planning with multiple pickups
- Rating System: Two-way rating system for both drivers and passengers

## 🛠 Tech Stack

**Core Technologies**

- Expo Router: File-based routing for React Native
- React Native: Cross-platform mobile development
- TypeScript: Type-safe development
- Redux Toolkit: State management with RTK Query
- Supabase: Backend-as-a-Service (PostgreSQL + Auth + Storage)

**Additional Libraries**

- React Native Maps: Map integration and route visualization
- React Native Elements: UI component library
- Stripe React Native: Payment processing
- Expo Notifications: Push notifications
- React Hook Form: Form management with validation

## 📁 Project Architecture

```text
src/
├── app/ # Expo Router app directory
│   ├── (auth)/ # Auth group routes
│   ├── (tabs)/ # Main tab navigation
│   └── _layout.tsx # Root layout
├── features/ # Feature-based architecture
│   ├── auth/
│   │   ├── authSlice.ts # Auth UI state
│   │   ├── authThunks.ts # Auth async logic
│   │   └── authSelectors.ts # Auth state selectors
│   ├── rides/
│   │   ├── ridesSlice.ts # Rides UI state
│   │   ├── ridesThunks.ts # Ride operations
│   │   ├── ridesSelectors.ts # Ride state selectors
│   │   └── components/ # Ride-specific components
│   └── profile/ # Profile feature
├── services/ # Supabase service layer
│   ├── base/
│   │   └── BaseService.ts # Base service abstraction
│   ├── auth/
│   │   ├── authService.ts # Auth service implementation
│   │   └── authApi.ts # RTK Query auth API
│   ├── users/
│   │   ├── usersService.ts # Users service
│   │   └── usersApi.ts # RTK Query users API
│   ├── rides/
│   │   ├── ridesService.ts # Rides service
│   │   └── ridesApi.ts # RTK Query rides API
│   └── index.ts # Service factory exports
├── store/ # Redux store configuration
│   ├── api/
│   │   └── rootApi.ts # Combined RTK APIs
│   └── rootReducer.ts # Combined reducers
├── shared/ # Shared utilities and components
│   ├── slices/ # Global state slices
│   ├── thunks/ # Global thunks
│   ├── components/ # Reusable components
│   └── utils/ # Utility functions
└── types/ # TypeScript type definitions
```

## 🏗 SOLID Architecture Implementation

1. **Single Responsibility Principle**

   - Services handle one domain each (Auth, Users, Rides)
   - Slices manage specific UI state domains
   - Components focus on single rendering responsibilities

2. **Open/Closed Principle**

```typescript
// Base service can be extended without modification
export abstract class BaseService<T> {
  constructor(
    protected supabase: SupabaseClient,
    protected tableName: string
  ) {}

  // Common CRUD operations
  protected async findById(id: string) {
    /* ... */
  }
  protected async create(data: any) {
    /* ... */
  }
}

// Extended for specific domains
export class RidesService extends BaseService<"rides"> {
  async findActiveRides() {
    /* ... */
  }
  async createRide(rideData: CreateRide) {
    /* ... */
  }
}
```

3. **Liskov Substitution Principle**

```typescript
// All services can be used interchangeably through BaseService interface
const services: BaseService<any>[] = [
  new UsersService(supabase),
  new RidesService(supabase),
  new PaymentsService(supabase),
];
```

4. **Interface Segregation Principle**

```typescript
// RTK Query provides focused interfaces
export const ridesApi = createApi({
  endpoints: (builder) => ({
    getRides: builder.query<Ride[], SearchParams>(),
    createRide: builder.mutation<Ride, CreateRide>(),
    // Each endpoint has a specific, focused purpose
  }),
});
```

5. **Dependency Inversion Principle**

```typescript
// Services depend on abstractions, not concretions
export class ServiceFactory {
  constructor(private supabase: SupabaseClient) {}

  getService<T>(ServiceClass: new (supabase: SupabaseClient) => T): T {
    return new ServiceClass(this.supabase);
  }
}
```

## 🔧 State Management

**RTK Query for Server State**

```typescript
// Automatic caching, loading states, and error handling
const { data: rides, isLoading, error } = useGetRidesQuery(searchParams);
const [createRide, { isLoading: isCreating }] = useCreateRideMutation();
```

**Redux Slices for UI State**

```typescript
// Local UI state that doesn't belong on the server
const ridesSlice = createSlice({
  name: "ridesUI",
  initialState: {
    filters: { status: "active", dateRange: null },
    searchQuery: "",
    selectedRideId: null,
    isMapView: false,
  },
  reducers: {
    setFilters: (state, action) => {
      /* ... */
    },
    setSearchQuery: (state, action) => {
      /* ... */
    },
  },
});
```

**Thunks for Complex Operations**

```typescript
// Multi-step operations involving multiple services
export const bookRideThunk = createAsyncThunk(
  "rides/bookRide",
  async (bookingData, { rejectWithValue, getState }) => {
    // 1. Validate booking
    // 2. Authorize payment
    // 3. Create booking
    // 4. Send notifications
  }
);
```

## 🎯 Service Factory Pattern

**Centralized Service Management**

```typescript
export const serviceFactory = new ServiceFactory(supabase);

// Singleton service instances
export const authService = serviceFactory.getService(AuthService);
export const usersService = serviceFactory.getService(UsersService);
export const ridesService = serviceFactory.getService(RidesService);
```

**Benefits**

- Singleton instances prevent multiple service instantiations
- Consistent configuration ensures all services share the same Supabase client
- Easy testing enables simple mocking of the entire service layer
- Lazy initialization creates services only when needed
- Centralized service cleanup simplifies lifecycle management

## 🚦 Getting Started

**Prerequisites**

- Node.js 18+
- Expo CLI
- Supabase account
- Stripe account (for payments)

**Installation**

1. Clone the repository

```bash
git clone https://github.com/your-username/ridely.git
cd ridely
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

4. Fill in your environment variables

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

5. Start the development server

```bash
npx expo start
```

**Supabase Setup**

- Create a new Supabase project
- Run the database schema (see `supabase/schema.sql`)
- Configure authentication with email/password and social providers
- Set up Row Level Security (RLS) policies
- Configure storage for user avatars and documents

## 📱 App Structure

**Navigation**

- Auth Stack: Login, Register, Forgot Password
- Main Tabs: Home, Search, Create Ride, Messages, Profile
- Modal Routes: Ride Details, Payment, Chat, Settings

**Key Screens**

- Onboarding: Welcome and feature introduction
- Home: Nearby rides and recommendations
- Ride Creation: Multi-step ride creation form
- Ride Details: Comprehensive ride information
- Booking Flow: Seat selection and payment
- Profile Management: User profile and preferences
- Chat: Real-time messaging

## 🧪 Testing

**E2E Tests (Detox)**

```bash
# Build for iOS
npm run detox:build:ios

# Build for Android
npm run detox:build:android

# Run E2E tests on iOS
npm run detox:test:ios

# Run E2E tests on Android
npm run detox:test:android
```

The E2E test suite uses Detox and follows a Page Object Model (POM) pattern. Tests are organized by features and flows. See [`e2e/README.md`](./e2e/README.md) for detailed documentation on the test structure and best practices.

**Test Structure**

- `e2e/features/` - Feature-specific tests
- `e2e/flows/` - Complete user journey tests
- `e2e/screens/` - Page Object Models for screen interactions
- `e2e/__helpers__/` - Shared utilities and test IDs
- `e2e/__fixtures__/` - Test data and fixtures

## 🚀 Deployment

**Expo Application Services (EAS)**

```bash
# Build for production
eas build --platform android
eas build --platform ios

# Submit to app stores
eas submit --platform android
eas submit --platform ios
```

**Environment-specific Builds**

- Development: Debug features and console logs enabled
- Staging: Production-like environment with test data
- Production: Optimized build with analytics enabled

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Code Style**

- TypeScript for type safety
- ESLint and Prettier for code formatting
- Feature-first architecture
- Meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.

## 🙏 Acknowledgments

- Expo Team for the excellent development experience
- Supabase for the powerful backend platform
- Redux Toolkit for simplified state management
- React Native Community for amazing libraries and tools

## 📞 Support

For support, email `support@ridely.app` or join our Slack channel.

Built with ❤️ using Expo, React Native, and Supabase
