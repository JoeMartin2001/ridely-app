// // features/rides/ridesThunks.ts
// import { RootState } from "@/lib/store";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { paymentsService, ridesService } from "../../../services";

// export const completeRideThunk = createAsyncThunk(
//   "rides/completeRide",
//   async (
//     { rideId, tipAmount }: { rideId: string; tipAmount: number },
//     { rejectWithValue, getState }
//   ) => {
//     try {
//       const state = getState() as RootState;
//       const userId = state.auth.user?.id;

//       if (!userId) {
//         throw new Error("User not authenticated");
//       }

//       // Complex business logic involving multiple services
//       const ride = await ridesService.completeRide(rideId);
//       await paymentsService.processPayment(rideId, tipAmount);
//       await ridesService.sendReceipt(rideId, userId);

//       return { ride, tipAmount };
//     } catch (error) {
//       return rejectWithValue({
//         message: error.message,
//         rideId,
//         timestamp: new Date().toISOString(),
//       });
//     }
//   }
// );

// export const cancelRideThunk = createAsyncThunk(
//   "rides/cancelRide",
//   async (
//     { rideId, reason }: { rideId: string; reason: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       await ridesService.cancelRide(rideId, reason);
//       return { rideId, reason, cancelledAt: new Date().toISOString() };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
