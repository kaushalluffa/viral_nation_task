export function handleScroll(getAllProfilesData,fetchMore) {
  if (
    getAllProfilesData?.getAllProfiles?.profiles?.length ===
    getAllProfilesData?.getAllProfiles?.size
  )
    return;
  if (
    window.innerHeight + document.documentElement.scrollTop ===
    document.documentElement.offsetHeight
  ) {
  
    fetchMore({
      variables: {
        rows: 16,
        page: 1,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult.getAllProfiles) return prevResult;

        return {
          ...prevResult,
          ...fetchMoreResult,
        };
      },
    });
  }
}