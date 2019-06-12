export default (props) => (
    (props.true || props.When) ?
        (typeof props.Then === "function" ? props.Then() : props.Then || "") :
        (typeof props.Else === "function" ? props.Else() : props.Else || "")
);