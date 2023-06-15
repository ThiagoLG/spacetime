import { app } from "@azure/functions"
import { getAllMemories, getMemoryByID, insertMemory } from "../actions/memories_actions"

/** List all memories from logged user */
app.http("memoriesAll", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getAllMemories,
  route: "memories",
})

/** List a specific memory */
app.http("memoriesByID", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getMemoryByID,
  route: "memories/{id}"
})

/** Create a new memory */
app.http("insertMemory", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: insertMemory,
  route: "memories"
})