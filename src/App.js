import React from "react";
import "./App.css";
import GPT from "./GPT";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";
 

const clerkPubKey = "pk_test_cGVhY2VmdWwtbW9zcXVpdG8tMzYuY2xlcmsuYWNjb3VudHMuZGV2JA";
 
function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <GPT />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}
 

 
export default App;