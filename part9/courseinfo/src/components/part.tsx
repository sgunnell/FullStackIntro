import { CoursePart } from "../types";

const margin = { marginTop: 5, marginBottom: 5 };

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ part }: {part: CoursePart }) => {
    switch (part.type){
        case  "normal":
            return(
                <div>
                    <ul style={margin}><i>{part.description}</i></ul>
                </div>
            );
        case  "groupProject":
            return(
                <div>
                    <ul style={margin}>Group Projects {part.groupProjectCount}</ul>
                </div>
            );
        case  "submission":
            return(
                <ul style={margin}>
                    <div>
                        <i>{part.description}</i>
                    </div>
                    <div>{part.exerciseSubmissionLink}</div>
                </ul>
            );
        case  "special":
            return(
                <ul style={margin}>
                    <div>
                        <i>{part.description}</i>
                    </div>
                    <div>
                        Required skills:{" "}
                        {part.requirements.map((skill) => skill).join(", ")}
                    </div>
                </ul>
            );
        default:
            return assertNever(part);
    }
};

export default Part;