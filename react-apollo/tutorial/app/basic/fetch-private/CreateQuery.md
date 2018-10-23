With Apollo Client, you can send queries in 2 different ways.

1. Using the `query` method directly and process the response as a promise.
2. New Render Prop API with React. (Recommended)

The recommended method is to use the render prop method, where you will just pass your GraphQL query as prop and `<Query />` component will fetch the data automatically and will present it in the component's render prop function.

```

import { Query } from 'react-apollo';

```

