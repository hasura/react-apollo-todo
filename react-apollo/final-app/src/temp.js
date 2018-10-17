var name = input.value;
var graphqlMutation = `mutation {
  insert_profile(objects: [{
  name: $name
  }]
}`;

graphqlClient(graphqlMutation, {name: "vamshi"});
