
function CoursesTaughtComponent(props) {

    return (
        <div className="border-2 border-[rgb(106,82,82)] max-w-35 max-h-35 p-2 overflow-wrap text-sm bg-[rgb(249,243,226)] shadow-lg overflow-hidden">
            <h2 className=" font-bold">{props.courseName}</h2>
        </div>
    );

}

export default CoursesTaughtComponent;