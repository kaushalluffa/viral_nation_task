// const [someFunction, {data: getData, loading: getLoading}] = useLazyQuery( GET_DATA_QUERY, {client: someClient}

// someFunction({varibales: {userId: Id}})

// const client = new ApolloClient({
// link: new HttpLink({
// uri: "https/yourAPIurl/graphql",
// headers: {
// authorization: {token}
// }
// })
// })

// const GET_ALL_PROFILES = gql`
// query getAllProfiles($orderBy: globalOrderBy, $searchString: String, $rows: Int, $page: Int )
// getAllProfiles(orderBy: $orderBy, searchString: $searchString, rows: $rows, page: $page ){
// code
// status
// msg
// data
// }
// `;

// const [getAllProfiles, {data: getAllProfilesData, loading: getAllProfilesLoading}] = useLazyQuery(GET_ALL_PROFILES, {client: clientName})

// getAllProfiles({
// variables: {
// search: searchInput,
// page: page,
// rows: 10,
// orderBy: orderDataObject,
// },
// });

// useEffect(() => {
// if (getAllprofilesData && !getAllProfilesLoading) {
//     setData(getAllProfilesData);
// }
// }, [getAllProfilesData?.data?.length]);