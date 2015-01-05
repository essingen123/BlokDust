//todo: remove these when fayde-unify is available
///<amd-dependency path="Fayde.Utils"/>.
///<amd-dependency path="Fayde.Transformer"/>.

import App = require("../App");
import BlocksSketch = require("../BlocksSketch");
import IBlock = require("../Blocks/IBlock");
import IModifiable = require("../Blocks/IModifiable");
import IModifier = require("../Blocks/IModifier");
import ToneSource = require("../Blocks/Sources/ToneSource");
import Noise = require("../Blocks/Sources/Noise");
import Microphone = require("../Blocks/Sources/Microphone");
import Keyboard = require("../Blocks/Modifiers/Keyboard");
import VolumeIncrease = require("../Blocks/Modifiers/VolumeIncrease");
import VolumeDecrease = require("../Blocks/Modifiers/VolumeDecrease")
import PitchIncrease = require("../Blocks/Modifiers/PitchIncrease");
import PitchDecrease = require("../Blocks/Modifiers/PitchDecrease");
import Envelope = require("../Blocks/Modifiers/Envelope");
import Filter = require("../Blocks/Modifiers/Filter");
import LFO = require("../Blocks/Modifiers/LFO");
import Delay = require("../Blocks/Modifiers/Delay");
import Scuzz = require("../Blocks/Modifiers/Scuzz");
import Distortion = require("../Blocks/Modifiers/Distortion");
import Chorus = require("../Blocks/Modifiers/Chorus");
import Reverb = require("../Blocks/Modifiers/Reverb");
import Phaser = require("../Blocks/Modifiers/Phaser");
import EQ = require("../Blocks/Modifiers/EQ");
import BitCrusher = require("../Blocks/Modifiers/BitCrusher");
import AutoWah = require("../Blocks/Modifiers/AutoWah");
import Panner = require("../Blocks/Modifiers/Panner");
import Power = require("../Blocks/Sources/Power");
import ParticleEmitter = require("../Blocks/Sources/ParticleEmitter");
import InfoViewModel = require("./InfoViewModel");

class MainViewModel extends Fayde.MVVM.ViewModelBase {

    private _BlocksSketch: BlocksSketch;
    private _SelectedBlock: IBlock;
    private _InfoViewModel: InfoViewModel;

    get SelectedBlock(): IBlock{
        //return this._InfoViewModel.SelectedBlock;
        return this._SelectedBlock;
    }

    set SelectedBlock(value: IBlock){
        this._SelectedBlock = value;
        //this._InfoViewModel.SelectedBlock = value;
        this.OnPropertyChanged("SelectedBlock");
    }

    constructor() {
        super();

        window.debug = true;

        App.Init();

        this._BlocksSketch = new BlocksSketch();

        this._BlocksSketch.BlockSelected.on((block: IModifiable) => {
            this._OnBlockSelected(block);
        }, this);

        this._InfoViewModel = new InfoViewModel();
    }

    ZoomIn_Click(){
        this._BlocksSketch.ZoomIn();
    }

    ZoomOut_Click(){
        this._BlocksSketch.ZoomOut();
    }

    BlocksSketch_Draw(e: Fayde.IEventBindingArgs<Fayde.Drawing.SketchDrawEventArgs>){
        this._BlocksSketch.SketchSession = <Fayde.Drawing.SketchSession>e.args.SketchSession;
    }

    BlocksSketch_MouseDown(e: Fayde.Input.MouseEventArgs){
        this._BlocksSketch.MouseDown(e);
    }

    BlocksSketch_TouchDown(e: Fayde.Input.TouchEventArgs){
        this._BlocksSketch.TouchDown(e);
    }

    BlocksSketch_MouseUp(e: Fayde.Input.MouseEventArgs){
        this._BlocksSketch.MouseUp(e);
    }

    BlocksSketch_MouseMove(e: Fayde.Input.MouseEventArgs){
        this._BlocksSketch.MouseMove(e);
    }

    _OnBlockSelected(block: IBlock){
        this.SelectedBlock = block;
    }

    PowerBlockBtn_Click(e: Fayde.Input.MouseButtonEventArgs){
        this._BlocksSketch.CreateBlock(ParticleEmitter);
    }

    ToneBlockBtn_Click(e: Fayde.Input.MouseButtonEventArgs){
        this._BlocksSketch.CreateBlock(ToneSource);
    }

    NoiseBlockBtn_Click(e: Fayde.Input.MouseButtonEventArgs){
        this._BlocksSketch.CreateBlock(Noise);
    }

    KeyboardBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(Keyboard);
    }

    VolumeIncreaseBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(VolumeIncrease);
    }

    VolumeDecreaseBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(VolumeDecrease);
    }

    PitchIncreaseBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(PitchIncrease);
    }

    PitchDecreaseBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(PitchDecrease);
    }

    EnvelopeBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(Envelope);
    }

    FilterBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(Filter);
    }

    LFOBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(LFO);
    }

    DelayBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(Delay);
    }

    ScuzzBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(Scuzz);
    }

    DistortionBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(Distortion);
    }

    ChorusBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(Chorus);
    }

    ReverbBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(Reverb);
    }

    PhaserBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(Phaser);
    }

    EQBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(EQ);
    }

    BitCrusherBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(BitCrusher);
    }

    AutoWahBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(AutoWah);
    }

    MicrophoneBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(Microphone);
    }

    PannerBlockBtn_Click(e: any){
        this._BlocksSketch.CreateBlock(Panner);
    }

    DeleteBlockBtn_Click(e: any){
        this._BlocksSketch.DeleteSelectedBlock();
    }

    UndoBtn_Click(e: any){
        this._BlocksSketch.Undo();
    }

    RedoBtn_Click(e: any){
        this._BlocksSketch.Redo();
    }
}

export = MainViewModel;