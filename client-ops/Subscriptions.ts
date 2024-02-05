import {gql} from "@apollo/client";
import {base} from "@/components/client-components/Info";

export const useSSESubscription = <T>(
  subscription: string,
  onSSEvent: (data: T) => void
) => {
  const url = new URL('/api/graphql', base);
  url.searchParams.append(
    'query',
    subscription
  );
  fetch(url.toString())
    .then(response => {
      // Get the readable stream from the response body
      const stream = response.body;
      // Get the reader from the stream
      const reader = stream?.getReader();
      // Define a function to read each chunk
      const readChunk = () => {
        // Read a chunk from the reader
        reader?.read()
          .then(({
                   value,
                   done
                 }) => {
            // Check if the stream is done
            if (done) {
              // Log a message
              console.log('Stream finished');
              // Return from the function
              return;
            }
            // Convert the chunk value to a string
            const chunkString = new TextDecoder().decode(value);
            // Log the chunk string
            if(chunkString.includes("data:")) {
              const parsedData = JSON.parse(chunkString.split("data:")[1]) as T
              onSSEvent(parsedData)
            }
            console.log(chunkString, chunkString.length);
            // Read the next chunk
            readChunk();
          })
          .catch(error => {
            // Log the error
            console.error(error);
          });
      };
      // Start reading the first chunk
      readChunk();
    })
    .catch(error => {
      // Log the error
      console.error(error);
    });
}

export const NewMessage = gql`
  subscription NewMessage {newMessage{body}}
`;

