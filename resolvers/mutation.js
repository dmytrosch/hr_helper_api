import employeeMutations from "./mutations/employeeMutations.js"
import positionMutations from "./mutations/positionMutations.js"

const Mutation = {
...positionMutations,
...employeeMutations
}

export default Mutation