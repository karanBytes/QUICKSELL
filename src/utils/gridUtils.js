// Utility function to group and sort tickets based on grouping and ordering preferences
export const loadGridData = (tickets, grouping, ordering) => {
    const sortedTickets = [...tickets].sort((a, b) => {
        if (ordering === "priority") {
            return b.priority - a.priority;
        } else {
            return a.title.localeCompare(b.title);
        }
    });

    // Step 2: Group tickets based on grouping preference
    switch (grouping) {
        case "status":
            return groupBy(sortedTickets, ticket => ticket.status, {
                "Backlog": [],
                "Todo": [],
                "In progress": [],
                "Done": [],
                "Canceled": []
            });

        case "users":
            return groupBy(sortedTickets, ticket => ticket.userId);

        case "priority":
            return groupBy(sortedTickets, ticket => getPriority(ticket.priority), {
                "No priority": [],
                "Low": [],
                "Medium": [],
                "High": [],
                "Urgent": []
            });

        default:
            return groupBy(sortedTickets, ticket => ticket.userId);
    }
};

// Map numerical priorities to readable labels
export const getPriority = (priority) => {
    const priorityMap = {
        0: "No priority",
        1: "Low",
        2: "Medium",
        3: "High",
        4: "Urgent"
    };
    return priorityMap[priority] || "No priority"; // Default to "No priority" if undefined
};

// Helper function to group tickets by a key
const groupBy = (tickets, keyFn, predefinedGroups = {}) => {
    return tickets.reduce((groups, ticket) => {
        const key = keyFn(ticket); 
        if (!groups[key]) groups[key] = []; 
        groups[key].push(ticket); 
        return groups;
    }, { ...predefinedGroups }); 
};
