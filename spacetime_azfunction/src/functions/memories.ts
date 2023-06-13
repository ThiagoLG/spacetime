import { app } from "@azure/functions"
import { getAllMemories, getMemoryByID } from "../actions/memories_actions"

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

/** List a specific memory */
app.http("memoriesByID", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getMemoryByID,
  route: "memories/{id}"
})