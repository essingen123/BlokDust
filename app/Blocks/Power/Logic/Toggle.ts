import {Effect} from '../../Effect';
import {IDisplayContext} from '../../../Core/Drawing/IDisplayContext';
import {ISource} from '../../ISource';
import {Logic} from './Logic';
import {MainScene} from '../../../MainScene';
import {Particle} from '../../../Particle';
import {Point} from '../../../Core/Primitives/Point';

export class Toggle extends Logic {

    Init(sketch: IDisplayContext): void {

        super.Init(sketch);

        this.Outline.push(new Point(0,-1), new Point(1,0), new Point(1,2), new Point(0,2), new Point(-1,1), new Point(-1,-1));
    }

    UpdateConnections() {
        const connections = this.Connections.ToArray();
        connections.forEach((source: ISource) => {
            if (this.Params.logic) {
                source.TriggerAttack();
            }
            if (!source.IsPressed){
                source.TriggerRelease('all');
            }
        });
    }

    Draw() {
        super.Draw();
        (<MainScene>this.Sketch).BlockSprites.DrawSprite(this.Position,true,"toggle switch");
    }

    UpdateOptionsForm() {
        super.UpdateOptionsForm();

        this.OptionsForm =
        {
            "name" : "Toggle Switch",
            "parameters" : [

                {
                    "type" : "switches",
                    "name" : "Power",
                    "setting" :"",
                    "switches": [
                        {
                            "name": "Off/On",
                            "setting": "logic",
                            "value": this.Params.logic,
                            "lit" : true,
                            "mode": "offOn"
                        }
                    ]
                }
            ]
        };
    }

    SetParam(param: string,value: number) {
        super.SetParam(param,value);

        if (param=="logic") {
            this.PerformLogic();
        }

        this.Params[""+param] = value;
    }

    PerformLogic() {
        super.PerformLogic();
        if (this.Params.logic) {
            this.Params.logic = false;
            let connections: ISource[] = this.Connections.ToArray();
            connections.forEach((source: ISource) => {
                source.TriggerRelease('all');
            });

        } else {
            this.Params.logic = true;
            let connections: ISource[] = this.Connections.ToArray();
            connections.forEach((source: ISource) => {
                source.TriggerAttack();
            });
        }
    }
}
