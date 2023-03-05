export function handleScroll({ fetchMore, setFetchedData, fetchedData }) {
  if (
    window.innerHeight + document.documentElement.scrollTop ===
    document.documentElement.offsetHeight
  ) {
    
    //i have this if check to stop the execution of the function below if the size is equal to the number of profiles we have in our state
    // but i spent a lot of time on this function it is not doing it correctly. If i would have more time i definitely would have tried more things
    //to make it work but all the examples i see are accepting a hasMore prop from backend which is not the response i am getting.
   
    if (fetchedData?.profiles?.length === fetchedData.size) {
      return;
    }
    if (fetchedData.profiles.length !== fetchedData.size) {
      //set timeout is to just delay the fetching for some time for a good ui experience
      setTimeout(() => {
        fetchMore({
          variables: {
            rows: 16,
            page: 1,
          },
        }).then(({ data }) => {
          setFetchedData((prevData) => {
            return {
              size: prevData.size,
              profiles: [
                ...new Set([
                  ...prevData.profiles,
                  ...data.getAllProfiles.profiles,
                ]),
              ],
            };
          });
        });

        //one more version to update the fetched data 
        //but i couldn't achieve what i needed so i have if only for reference that i am aware of this method
        
        // fetchMore({
        //   variables: {
        //     rows: 16,
        //     page: pageNumber + 1,
        //   },
        //   updateQuery: (prevResult, { fetchMoreResult }) => {
        //     if (!fetchMoreResult.getAllProfiles.profiles) return prevResult;

        //     return {
        //       ...prevResult,
        //       ...fetchMoreResult,
        //     };
        //   },
        // });
      }, 300);
    }
  }
}
