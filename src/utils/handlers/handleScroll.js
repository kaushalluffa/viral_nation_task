export function handleScroll({ fetchMore, setFetchedData }) {
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
        if (data?.getAllProfiles?.profiles?.length <= 0) {
          return;
        } else {
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
        }
      });

      //one more version to update the fetched data but i couldn't achieve what i needed so i have if only for reference that i am aware of this method
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
    }, 300);
  }
}
