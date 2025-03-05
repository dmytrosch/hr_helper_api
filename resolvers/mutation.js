import employeeMutations from "./mutations/employeeMutations.js"
import positionMutations from "./mutations/positionMutations.js"
import projectMutations from "./mutations/projectMutations.js"

const Mutation = {
...positionMutations,
...employeeMutations,
...projectMutations
}

export default Mutation