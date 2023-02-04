import { CoursePart } from "../types";
import Part from "./part";

const Content = ({ parts }: {parts: CoursePart[] }) => {
    return(
        <div>
            {parts.map((part) => (
                <div> 
                    <div>
                    <strong>
                        {part.name} {part.exerciseCount}
                    </strong>
                    </div>
                    <Part part={part} />
                </div>
            ))}
        </div>
    );
};

export default Content;