export function handleScroll( fetchMore, setFetchedData) {
  //as you see i tried comparing the length and size property to stop the execution which didn't stop it if had hasMore prop returning from backend i could use it to stop the execution
 
  if (
    window.innerHeight + document.documentElement.scrollTop ===
    document.documentElement.offsetHeight
  ) {
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
      // fetchMore({
      //   variables: {
      //     rows: 16,
      //     page: 1,
      //   },
      //   updateQuery: (prevResult, { fetchMoreResult }) => {
      //     if (!fetchMoreResult.getAllProfiles) return prevResult;

      //     return {
      //       ...prevResult,
      //       ...fetchMoreResult,
      //     };
      //   },
      // });
    }, 500);
  }
}
