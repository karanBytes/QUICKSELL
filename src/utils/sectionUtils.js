const icons = {
    status: {
        "Backlog": "/assets/Backlog.svg",
        "Todo": "/assets/To-do.svg",
        "In progress": "/assets/in-progress.svg",
        "Done": "/assets/Done.svg",
        "Canceled": "/assets/Cancelled.svg",
    },
    priority: {
        "No priority": "/assets/No-priority.svg",
        "Low": "/assets/Img - Low Priority.svg",
        "Medium": "/assets/Img - Medium Priority.svg",
        "High": "/assets/Img - High Priority.svg",
        "Urgent": "/assets/SVG - Urgent Priority colour.svg",
    }
};

export const getStatusIcon = (status) => (
    <img
        src={icons.status[status] || icons.status["Canceled"]}
        height={15}
        width={15}
        alt={status.toLowerCase()}
    />
);

export const getPriorityIcon = (priority) => (
    <img
        src={icons.priority[priority] || icons.priority["Urgent"]}
        height={15}
        width={15}
        alt={priority.toLowerCase()}
    />
);
