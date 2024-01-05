import express from "express";
import { getTMDBResponse } from "./common";
import { convertPerson, PersonType } from "../types/person";

const peopleRouter = express.Router();

peopleRouter.get("/person/:id",
    async (request, response) => {
        const personId = request.params.id;
        try {
            const res = await getTMDBResponse(
                request,
                response,
                `person/${personId}`,
                {
                    append_to_response: "images,movie_credits"
                }
            );
            const personType: PersonType = res.data;
            response.send({
                code: "SUCCESS",
                message: "Successfully fetched person",
                data: { results: convertPerson(personType) }
            });
        } catch (error) {
            console.error(error);
            response.status(404).send({
                code: "ERROR_PERSON_FETCH",
                message: `Error fetching person with id: ${personId}`
            });
        }
    });

export default peopleRouter;