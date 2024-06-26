import {elasticSearchConfig} from "../config/connection"
import {Request, Router} from "express"
import bodyParser from "body-parser"
import {Logger} from "@nestjs/common"
const app = Router()

app.use(bodyParser.json())

export async function createIndex(req: Request) {
  const formAttributesFiltered = JSON.stringify(
    Object.assign({}, filterAttributesBasedOnIsearchable(req.body.attributes))
  )
  const elasticSearchAttributes = {
    attributes: formAttributesFiltered,
    trayId: JSON.parse(req.body.trayId),
    rackId: JSON.parse(req.body.rackId)
  }
  const myBody = JSON.stringify(elasticSearchAttributes)
  const index = req.body.name
  const type = req.body.name
  const routing = req.body.username
  await elasticSearchConfig.index(
    {
      index: index,
      body: myBody,
      id: req.body.rackId,
      type: type,
      routing: routing
    },
    function (err) {
      Logger.error(err)
    }
  )
}

app.get("/living", (req: Request) => {
  const searchText = req.query.searchString as string
  const data = elasticSearchConfig.search({
    index: "living",
    body: {
      query: {
        match: {name: searchText?.trim()}
      }
    }
  })
  return data
})

function filterAttributesBasedOnIsearchable(formAttributes): void {
  const resultantAttributes: string[] = []
  const filteredObjects = formAttributes.filter(
    attributes => attributes.isSearchable == "true"
  )
  for (let i = 0; i < filteredObjects.length; i++) {
    resultantAttributes[i] =
      filteredObjects[i].label + ":" + filteredObjects[i].value
  }
}
