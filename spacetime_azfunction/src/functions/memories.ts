import { app } from "@azure/functions"
import { getAllMemories, getMemoryByID, insertMemory, updateMemory } from "../actions/memories_actions"
import { authenticatedRoute } from "../middleware/AuthMiddleware"

/** List all memories from logged user */
app.http("memoriesAll", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: authenticatedRoute(getAllMemories),
  route: "memories",
})

/** List a specific memory */
app.http("memoriesByID", { 
  methods: ["GET"],
  authLevel: "anonymous",
  handler: authenticatedRoute(getMemoryByID),
  route: "memories/{id}"
})

/** Create a new memory */
app.http("insertMemory", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: authenticatedRoute(insertMemory),
  route: "memories"
})

/** Update a specific memory */
app.http("updateMemory", {
  methods: ["PUT"],
  authLevel: "anonymous",
  handler: authenticatedRoute(updateMemory),
  route: "memories/{id}"
})

/** Delete a specific memory */
app.http("deleteMemory", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  handler: authenticatedRoute(updateMemory),
  route: "memories/{id}"
})