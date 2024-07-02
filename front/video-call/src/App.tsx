// import { useEffect, useState } from 'react';
// import {
//   Call,
//   CallControls,
//   CallingState,
//   SpeakerLayout,
//   StreamCall,
//   StreamTheme,
//   StreamVideo,
//   StreamVideoClient,
//   useCallStateHooks,
//   User,
// } from '@stream-io/video-react-sdk';

// import '@stream-io/video-react-sdk/dist/css/styles.css';
// import './style.css';

// const apiKey = 'REPLACE_WITH_API_KEY'; // the API key can be found in the "Credentials" section
// const token = 'REPLACE_WITH_TOKEN'; // the token can be found in the "Credentials" section
// const userId = 'REPLACE_WITH_USER_ID'; // the user id can be found in the "Credentials" section
// const callId = 'REPLACE_WITH_CALL_ID'; // the call id can be found in the "Credentials" section

// const user: User = {
//   id: userId,
//   name: 'Oliver',
//   image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
// };

// // initialize the StreamVideoClient
// const client = new StreamVideoClient({ apiKey, user, token });

// export default function App() {
//   const [call, setCall] = useState<Call>();
//   useEffect(() => {
//     const myCall = client.call('default', callId);
//     myCall.join({ create: true }).catch((err) => {
//       console.error(`Failed to join the call`, err);
//     });

//     setCall(myCall);

//     return () => {
//       setCall(undefined);
//       myCall.leave().catch((err) => {
//         console.error(`Failed to leave the call`, err);
//       });
//     };
//   }, []);

//   if (!call) return null;

//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <UILayout />
//       </StreamCall>
//     </StreamVideo>
//   );
// }

// export const UILayout = () => {
//   const { useCallCallingState } = useCallStateHooks();
//   const callingState = useCallCallingState();
//   if (callingState !== CallingState.JOINED) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <StreamTheme>
//       <SpeakerLayout participantsBarPosition="bottom" />
//       <CallControls />
//     </StreamTheme>
//   );
// };

import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
} from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import './style.css';

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiR2VuZXJhbF9Hcmlldm91cyIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvR2VuZXJhbF9Hcmlldm91cyIsImlhdCI6MTcxOTg3NDc1OCwiZXhwIjoxNzIwNDc5NTYzfQ.zBUxa05nVTenYxN8DLNthvjE5DqIXiRzt108Pf6WUok';
const userId = 'General_Grievous';
const callId = 'S7EoFHsnHg0C';

const user: User = {
  id: userId,
  name: 'Oliver',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
call.join({ create: true });

export default function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition='bottom' />
      <CallControls />
    </StreamTheme>
  );
};

