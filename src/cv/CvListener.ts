import {Injectable} from "@nestjs/common";
import {OnEvent} from "@nestjs/event-emitter";
import {CV_EVENTS} from "./cv.events.config";

@Injectable()
export class CvListener {

    @OnEvent(CV_EVENTS.add)
    async handleCvAdded(payload: any) {
        console.log( "cv with id ", payload.cv.id ," was added  !");
    }

    @OnEvent(CV_EVENTS.update)
    async handleCvUpdated(payload: any) {
        console.log("cv with id ",payload.cv.id, " was updated  !" );
    }

    @OnEvent(CV_EVENTS.delete)
    async handleCvDeleted(payload: any) {
        console.log("cv with id ",payload.cv.id, " was deleted  !" );
    }

}