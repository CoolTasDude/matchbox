/*!
Copyright (c) 2012-2022 John Nesky and contributing authors

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
of the Software, and to permit persons to whom the Software is furnished to do 
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
SOFTWARE.
*/

import { Song } from "./synth";

export interface Dictionary<T> {
    [K: string]: T;
}

// @TODO: Not ideal to make this writable like this.
// export interface DictionaryArray<T> extends ReadonlyArray<T> {
export interface DictionaryArray<T> extends Array<T> {
    dictionary: Dictionary<T>;
}

export const enum FilterType {
    lowPass,
    highPass,
    peak,
    length,
}

export const enum SustainType {
	bright,
	acoustic,
    length,
}

export const enum GranularEnvelopeType {
    parabolic,
    raisedCosineBell,
    // trapezoid,
    length
}

export const enum EnvelopeType {
    none,
    noteSize,
    pitch, //slarmoo's box 0.9
    pseudorandom, //slarmoo's box 1.3
	punch,
	flare,
	twang,
	swell,
	lfo, //renamed from tremolo in slarmoo's box 1.3
    tremolo2, //deprecated as of slarmoo's box 1.3; Kept for updating integrity and drumsets
    decay,
    wibble,
    linear,
    rise,
    blip,
    fall, //slarmoo's box 1.2
    //add new envelope types here
}

export const enum InstrumentType {
    chip,
    fm,
    noise,
    spectrum,
    drumset,
    harmonics,
    pwm,
    pickedString,
    supersaw,
    customChipWave,
    mod,
    fm6op,
    length,
}

export const TypePresets: ReadonlyArray<string> = ["chip", "FM", "noise", "spectrum", "drumset", "harmonics", "pulse width", "picked string", "supersaw", "chip (custom)", "mod", "FM (6-op)"];

export const enum DropdownID {
    Vibrato = 0,
    Pan = 1,
    Chord = 2,
    Transition = 3,
    FM = 4,
    PulseWidth = 5,
    Unison = 6,
    Envelope = 7,
    EnvelopeSettings = 8,
    PhaserStages = 9,
    FlangerMix = 10,
    PitchShift = 11,
    InstrumentVolume = 12,
}

export const enum EffectType {
    reverb,
    chorus,
    panning,
    distortion,
    bitcrusher,
    noteFilter,
    echo,
    pitchShift,
    detune,
    vibrato,
    transition,
    chord,
    // If you add more, you'll also have to extend the bitfield used in Base64 which currently uses three six-bit characters.
    noteRange, //no longer just a placeholder :3
    ringModulation,
    granular,
    phaser,
    octaveShift, //Studio Box port placeholder just in case
    invertWave,
    compressor,
    flanger,
    length,
}

export const enum EnvelopeComputeIndex {
    noteVolume,
    noteFilterAllFreqs,
    pulseWidth,
    stringSustain,
    unison,
    operatorFrequency0, operatorFrequency1, operatorFrequency2, operatorFrequency3, operatorFrequency4, operatorFrequency5,
    operatorAmplitude0, operatorAmplitude1, operatorAmplitude2, operatorAmplitude3, operatorAmplitude4, operatorAmplitude5,
    feedbackAmplitude,
    pitchShift,
    detune,
    vibratoDepth,
    //vibratoSpeed, doesn't follow normal envelope pattern; will figure out. //if you fix this you need to update the url
    noteFilterFreq0, noteFilterFreq1, noteFilterFreq2, noteFilterFreq3, noteFilterFreq4, noteFilterFreq5, noteFilterFreq6, noteFilterFreq7,
    noteFilterGain0, noteFilterGain1, noteFilterGain2, noteFilterGain3, noteFilterGain4, noteFilterGain5, noteFilterGain6, noteFilterGain7,
    decimalOffset, 
    supersawDynamism, 
	supersawSpread, 
    supersawShape, 
    panning,
    distortion,
    bitcrusherQuantization,
    bitcrusherFrequency,
    chorus,
    echoSustain,
    reverb,
    arpeggioSpeed,
    ringModulation,
    ringModulationHz,
    granular,
    grainAmount,
    grainSize,
    grainRange,
    echoDelay,
    //Add more here

    phaserFreq,
    phaserMix,
    phaserFeedback,
    phaserStages,
    invertWave,
    
    compressorThreshold,
    compressorTime,
    compressorRatioDown,
    compressorRatioUp,
    compressorLoGain,
    compressorMidGain,
    compressorHiGain,

    flangerMix,
    flangerVoices,
    flangerDelay,
    flangerPan,
    flangerFeedmix,

    length,
}

export const enum LFOEnvelopeTypes {
    sine,
    square,
    triangle,
    sawtooth,
    trapezoid,
    steppedSaw,
    steppedTri,
    length,
}

export const enum RandomEnvelopeTypes {
    time,
    pitch,
    note,
    timeSmooth,
    length,
}

export interface BeepBoxOption {
    readonly index: number;
    readonly name: string;
}

export interface Scale extends BeepBoxOption {
    readonly intervals: string;
    readonly realName: string;
}

export interface Key extends BeepBoxOption {
    readonly isWhiteKey: boolean;
    readonly basePitch: number;
}

export interface Rhythm extends BeepBoxOption {
    readonly stepsPerBeat: number;
    readonly roundUpThresholds: number[] | null;
}

export interface ChipWave extends BeepBoxOption {
    readonly expression: number;
    samples: Float32Array;
    isPercussion?: boolean;
    isCustomSampled?: boolean;
    isSampled?: boolean;
    extraSampleDetune?: number;
    rootKey?: number;
    sampleRate?: number;
}

export interface OperatorWave extends BeepBoxOption {
    samples: Float32Array;
}

export interface ChipNoise extends BeepBoxOption {
    readonly expression: number;
    readonly basePitch: number;
    readonly pitchFilterMult: number;
    readonly isSoft: boolean;
    samples: Float32Array | null;
}

export interface Transition extends BeepBoxOption {
    readonly isSeamless: boolean;
    readonly continues: boolean;
    readonly slides: boolean;
    readonly slideTicks: number;
    readonly includeAdjacentPatterns: boolean;
}

export interface Vibrato extends BeepBoxOption {
    readonly amplitude: number;
    readonly type: number;
    readonly delayTicks: number;
}

export interface VibratoType extends BeepBoxOption {
    readonly periodsSeconds: number[];
    readonly period: number;
}

export interface Unison extends BeepBoxOption {
    readonly voices: number;
    readonly spread: number;
    readonly offset: number;
    readonly expression: number;
    readonly sign: number;
}

export interface Modulator extends BeepBoxOption {
    readonly name: string; // name that shows up in song editor UI
    readonly pianoName: string; // short name that shows up in mod piano UI
    readonly maxRawVol: number; // raw
    readonly newNoteVol: number; // raw
    readonly forSong: boolean; // true - setting is song scope
    convertRealFactor: number; // offset that needs to be applied to get a "real" number display of value, for UI purposes
    readonly associatedEffect: EffectType; // effect that should be enabled for this modulator to work properly. If unused, set to EffectType.length.
    readonly promptName: string; // long-as-needed name that shows up in tip prompt
    readonly promptDesc: string[]; // paragraph(s) describing how to use this mod
    invertSliderIndicator?: boolean; // for whether or not you want to invert the slider indicator
    readonly maxIndex: number;
}

export interface Chord extends BeepBoxOption {
    readonly customInterval: boolean;
    readonly arpeggiates: boolean;
    readonly strumParts: number;
    readonly singleTone: boolean;
}

export interface Algorithm extends BeepBoxOption {
    readonly carrierCount: number;
    readonly associatedCarrier: ReadonlyArray<number>;
    readonly modulatedBy: ReadonlyArray<ReadonlyArray<number>>;
}

export interface OperatorFrequency extends BeepBoxOption {
    readonly mult: number;
    readonly hzOffset: number;
    readonly amplitudeSign: number;
}

export interface Feedback extends BeepBoxOption {
    readonly indices: ReadonlyArray<ReadonlyArray<number>>;
}

export interface Envelope extends BeepBoxOption {
    readonly type: EnvelopeType;
    readonly speed: number;
}

export interface AutomationTarget extends BeepBoxOption {
    readonly computeIndex: EnvelopeComputeIndex /*| InstrumentAutomationIndex*/ | null;
    readonly displayName: string;
    readonly perNote: boolean; // Whether to compute envelopes on a per-note basis.
    readonly interleave: boolean; // Whether to interleave this target with the next one in the menu (e.g. filter frequency and gain).
	readonly isFilter: boolean; // Filters are special because the maxCount depends on other instrument settings.
	//readonly range: number | null; // set if automation is allowed.
    readonly maxCount: number;
    readonly effect: EffectType | null;
    readonly compatibleInstruments: InstrumentType[] | null;
}

export const enum SampleLoadingStatus {
    loading,
    loaded,
    error,
}

export function getSampleLoadingStatusName(status: SampleLoadingStatus): string {
    switch (status) {
	case SampleLoadingStatus.loading: return "loading";
	case SampleLoadingStatus.loaded: return "loaded";
	case SampleLoadingStatus.error: return "error";
    }
}

export class SampleLoadingState {
    public statusTable: Dictionary<SampleLoadingStatus>;
    public urlTable: Dictionary<string>;
    public totalSamples: number;
    public samplesLoaded: number;
    public samplesFailed: number;

    constructor() {
	this.statusTable = {};
	this.urlTable = {};
	this.totalSamples = 0;
	this.samplesLoaded = 0;
	this.samplesFailed = 0;
    }
}

export const sampleLoadingState: SampleLoadingState = new SampleLoadingState();

export class SampleLoadedEvent extends Event {
    public readonly totalSamples: number;
    public readonly samplesLoaded: number;
    public readonly samplesFailed: number;

    constructor(totalSamples: number, samplesLoaded: number, samplesFailed: number) {
	super("sampleloaded");
	this.totalSamples = totalSamples;
	this.samplesLoaded = samplesLoaded;
    this.samplesFailed = samplesFailed;
    }
}

export interface SampleLoadEventMap {
    "sampleloaded": SampleLoadedEvent;
}

export class SampleLoadEvents extends EventTarget {
    constructor() {
	super();
    }
}

export const sampleLoadEvents: SampleLoadEvents = new SampleLoadEvents();

export async function startLoadingSample(url: string, chipWaveIndex: number, presetSettings: Dictionary<any>, rawLoopOptions: any, customSampleRate: number): Promise<void> {
    // @TODO: Make parts of the code that expect everything to already be
    // in memory work correctly.
    // It would be easy to only instantiate `SongEditor` and company after
    // everything is loaded, but if dynamic sample loading without a reload
    // is deemed necessary, anything that involves chip waves has to be
    // revisited so as to be able to work with a changing list of chip
    // waves that may or may not be ready to be used.
    const sampleLoaderAudioContext = new AudioContext({ sampleRate: customSampleRate });
    let closedSampleLoaderAudioContext: boolean = false;
    const chipWave = Config.chipWaves[chipWaveIndex];
    const rawChipWave = Config.rawChipWaves[chipWaveIndex];
    const rawRawChipWave = Config.rawRawChipWaves[chipWaveIndex];
    if (OFFLINE) {
        if (url.slice(0, 5) === "file:") {
            const dirname = await getDirname();
            const joined = await pathJoin(dirname, url.slice(5));
            url = joined;
        }
    }
    fetch(url).then((response) => {
	if (!response.ok) {
	    // @TODO: Be specific with the error handling.
	    sampleLoadingState.statusTable[chipWaveIndex] = SampleLoadingStatus.error;
	    return Promise.reject(new Error("Couldn't load sample"));
	}
	return response.arrayBuffer();
    }).then((arrayBuffer) => {
	return sampleLoaderAudioContext.decodeAudioData(arrayBuffer);
    }).then((audioBuffer) => {
	// @TODO: Downmix.
	const samples = centerWave(Array.from(audioBuffer.getChannelData(0)));
	const integratedSamples = performIntegral(samples);
	chipWave.samples = integratedSamples;
	rawChipWave.samples = samples;
	rawRawChipWave.samples = samples;
	if (rawLoopOptions["isUsingAdvancedLoopControls"]) {
	    presetSettings["chipWaveLoopStart"] = rawLoopOptions["chipWaveLoopStart"] != null ? rawLoopOptions["chipWaveLoopStart"] : 0;
	    presetSettings["chipWaveLoopEnd"] = rawLoopOptions["chipWaveLoopEnd"] != null ? rawLoopOptions["chipWaveLoopEnd"] : samples.length - 1;
	    presetSettings["chipWaveLoopMode"] = rawLoopOptions["chipWaveLoopMode"] != null ? rawLoopOptions["chipWaveLoopMode"] : 0;
	    presetSettings["chipWavePlayBackwards"] = rawLoopOptions["chipWavePlayBackwards"];
	    presetSettings["chipWaveStartOffset"] = rawLoopOptions["chipWaveStartOffset"] != null ? rawLoopOptions["chipWaveStartOffset"] : 0;
	}
	sampleLoadingState.samplesLoaded++;
	sampleLoadingState.statusTable[chipWaveIndex] = SampleLoadingStatus.loaded;
	sampleLoadEvents.dispatchEvent(new SampleLoadedEvent(
	    sampleLoadingState.totalSamples,
	    sampleLoadingState.samplesLoaded,
	    sampleLoadingState.samplesFailed
	));
	if (!closedSampleLoaderAudioContext) {
	    closedSampleLoaderAudioContext = true;
	    sampleLoaderAudioContext.close();
	}
    }).catch((error) => {
	//console.error(error);
	sampleLoadingState.statusTable[chipWaveIndex] = SampleLoadingStatus.error;
    sampleLoadingState.samplesFailed++;
	alert("Failed to load " + url + ":\n" + error);
    sampleLoadEvents.dispatchEvent(new SampleLoadedEvent(
	    sampleLoadingState.totalSamples,
	    sampleLoadingState.samplesLoaded,
	    sampleLoadingState.samplesFailed
	));
	if (!closedSampleLoaderAudioContext) {
	    closedSampleLoaderAudioContext = true;
	    sampleLoaderAudioContext.close();
	}
    });
}

export function getLocalStorageItem<T>(key: string, defaultValue: T): T | string {
    let value: T | string | null = localStorage.getItem(key);
    if (value == null || value === "null" || value === "undefined") {
        value = defaultValue;
    }
    return value;
}

// @HACK: This just assumes these exist, regardless of whether they actually do
// or not.
declare global {
    const OFFLINE: boolean; // for UB offline
    const getDirname: () => Promise<string>; // for UB offline
    const pathJoin: (...parts: string[]) => Promise<string>; // for UB offline
    const kicksample: number[];
    const snaresample: number[];
    const pianosample: number[];
    const WOWsample: number[];
    const overdrivesample: number[];
    const trumpetsample: number[];
    const saxophonesample: number[];
    const orchhitsample: number[];
    const detatchedviolinsample: number[];
    const synthsample: number[];
    const sonic3snaresample: number[];
    const comeonsample: number[];
    const choirsample: number[];
    const overdrivensample: number[];
    const flutesample: number[];
    const legatoviolinsample: number[];
    const tremoloviolinsample: number[];
    const amenbreaksample: number[];
    const pizzicatoviolinsample: number[];
    const timallengruntsample: number[];
    const tubasample: number[];
    const loopingcymbalsample: number[];
    const kickdrumsample: number[];
    const snaredrumsample: number[];
    const closedhihatsample: number[];
    const foothihatsample: number[];
    const openhihatsample: number[];
    const crashsample: number[];
    const pianoC4sample: number[];
    const liverpadsample: number[];
    const marimbasample: number[];
    const susdotwavsample: number[];
    const wackyboxttssample: number[];
    const peppersteak1: number[];
    const peppersteak2: number[];
    const vinyl: number[];
    const slapbass: number[];
    const hdeboverdrive: number[];
    const sunsoftbass: number[];
    const masculinechoir: number[];
    const femininechoir: number[];
    const southtololoche: number[];
    const harp: number[];
    const panflute: number[];
    const krumhorn: number[];
    const timpani: number[];
    const crowdhey: number[];
    const warioland4brass: number[];
    const warioland4organ: number[];
    const warioland4daow: number[];
    const warioland4hourchime: number[];
    const warioland4tick: number[];
    const kirbykick: number[];
    const kirbysnare: number[];
    const kirbybongo: number[];
    const kirbyclick: number[];
    const funkkick: number[];
    const funksnare: number[];
    const funksnareleft: number[];
    const funksnareright: number[];
    const funktomhigh: number[];
    const funktomlow: number[];
    const funkhihatclosed: number[];
    const funkhihathalfopen: number[];
    const funkhihatopen: number[];
    const funkhihatopentip: number[];
    const funkhihatfoot: number[];
    const funkcrash: number[];
    const funkcrashtip: number[];
    const funkride: number[];
    const chronoperc1finalsample: number[];
    const synthkickfmsample: number[];
    const woodclicksample: number[];
    const acousticsnaresample: number[];
    const catpaintboxsample: number[];
    const gameboypaintboxsample: number[];
    const mariopaintboxsample: number[];
    const drumpaintboxsample: number[];
    const yoshipaintboxsample: number[];
    const starpaintboxsample: number[];
    const fireflowerpaintboxsample: number[];
    const dogpaintbox: number[];
    const oinkpaintbox: number[];
    const swanpaintboxsample: number[];
    const facepaintboxsample: number[];
}

function loadScript(url: string): Promise<void> {
    const result: Promise<void> = new Promise((resolve, reject) => {
	if (!Config.willReloadForCustomSamples) {
	    const script = document.createElement("script");
	    script.src = url;
	    document.head.appendChild(script);
	    script.addEventListener("load", (event) => {
		resolve();
	    });
	} else {
	    // There's not really any errors that show up if the loading for
	    // this script is stopped early, but it won't really do anything
	    // particularly useful either in that case.
	}
    });
    return result;
}

export function loadBuiltInSamples(set: number): void {
    const defaultIndex: number = 0;
    const defaultIntegratedSamples: Float32Array = Config.chipWaves[defaultIndex].samples;
    const defaultSamples: Float32Array = Config.rawRawChipWaves[defaultIndex].samples;

    if (set == 0) {
	// Create chip waves with the wrong sound.
	const chipWaves = [
	    { name: "paandorasbox kick", expression: 4.0, isSampled: true, isPercussion: true, extraSampleDetune: 0 },
	    { name: "paandorasbox snare", expression: 3.0, isSampled: true, isPercussion: true, extraSampleDetune: 0 },
	    { name: "paandorasbox piano1", expression: 3.0, isSampled: true, isPercussion: false, extraSampleDetune: 2 },
	    { name: "paandorasbox WOW", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: 0 },
	    { name: "paandorasbox overdrive", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -2 },
	    { name: "paandorasbox trumpet", expression: 3.0, isSampled: true, isPercussion: false, extraSampleDetune: 1.2 },
	    { name: "paandorasbox saxophone", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -5 },
	    { name: "paandorasbox orchestrahit", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: 4.2 },
	    { name: "paandorasbox detatched violin", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: 4.2 },
	    { name: "paandorasbox synth", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -0.8 },
	    { name: "paandorasbox sonic3snare", expression: 2.0, isSampled: true, isPercussion: true, extraSampleDetune: 0 },
	    { name: "paandorasbox come on", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: 0 },
	    { name: "paandorasbox choir", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -3 },
	    { name: "paandorasbox overdriveguitar", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -6.2 },
	    { name: "paandorasbox flute", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -6 },
	    { name: "paandorasbox legato violin", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -28 },
	    { name: "paandorasbox tremolo violin", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -33 },
	    { name: "paandorasbox amen break", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -55 },
	    { name: "paandorasbox pizzicato violin", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -11 },
	    { name: "paandorasbox tim allen grunt", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -20 },
	    { name: "paandorasbox tuba", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: 44 },
	    { name: "paandorasbox loopingcymbal", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -17 },
	    { name: "paandorasbox standardkick", expression: 2.0, isSampled: true, isPercussion: true, extraSampleDetune: -7 },
	    { name: "paandorasbox standardsnare", expression: 2.0, isSampled: true, isPercussion: true, extraSampleDetune: 0 },
	    { name: "paandorasbox closedhihat", expression: 2.0, isSampled: true, isPercussion: true, extraSampleDetune: 5 },
	    { name: "paandorasbox foothihat", expression: 2.0, isSampled: true, isPercussion: true, extraSampleDetune: 4 },
	    { name: "paandorasbox openhihat", expression: 2.0, isSampled: true, isPercussion: true, extraSampleDetune: -31 },
	    { name: "paandorasbox crashcymbal", expression: 2.0, isSampled: true, isPercussion: true, extraSampleDetune: -43 },
	    { name: "paandorasbox pianoC4", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -42.5 },
	    { name: "paandorasbox liver pad", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -22.5 },
	    { name: "paandorasbox marimba", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -15.5 },
	    { name: "paandorasbox susdotwav", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -24.5 },
	    { name: "paandorasbox wackyboxtts", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -17.5 },
	    { name: "paandorasbox peppersteak_1", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -42.2 },
	    { name: "paandorasbox peppersteak_2", expression: 2.0, isSampled: true, isPercussion: false, extraSampleDetune: -47 },
	    { name: "paandorasbox vinyl_noise", expression: 2.0, isSampled: true, isPercussion: true, extraSampleDetune: -50 },
	    { name: "paandorasbeta slap bass", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -56 },
	    { name: "paandorasbeta HD EB overdrive guitar", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -60 },
	    { name: "paandorasbeta sunsoft bass", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -18.5 },
	    { name: "paandorasbeta masculine choir", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -50 },
	    { name: "paandorasbeta feminine choir", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -60.5 },
	    { name: "paandorasbeta tololoche", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -29.5 },
	    { name: "paandorasbeta harp", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -54 },
	    { name: "paandorasbeta pan flute", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -58 },
	    { name: "paandorasbeta krumhorn", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -46 },
	    { name: "paandorasbeta timpani", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -50 },
	    { name: "paandorasbeta crowd hey", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -29 },
	    { name: "paandorasbeta wario land 4 brass", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -68 },
	    { name: "paandorasbeta wario land 4 rock organ", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -63 },
	    { name: "paandorasbeta wario land 4 DAOW", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -35 },
	    { name: "paandorasbeta wario land 4 hour chime", expression: 1.0, isSampled: true, isPercussion: false, extraSampleDetune: -47.5 },
	    { name: "paandorasbeta wario land 4 tick", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -12.5 },
	    { name: "paandorasbeta kirby kick", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -46.5 },
	    { name: "paandorasbeta kirby snare", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -46.5 },
	    { name: "paandorasbeta kirby bongo", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -46.5 },
	    { name: "paandorasbeta kirby click", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -46.5 },
	    { name: "paandorasbeta sonor kick", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -28.5 },
	    { name: "paandorasbeta sonor snare", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -28.5 },
	    { name: "paandorasbeta sonor snare (left hand)", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -22.5 },
	    { name: "paandorasbeta sonor snare (right hand)", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -22.5 },
	    { name: "paandorasbeta sonor high tom", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -41.5 },
	    { name: "paandorasbeta sonor low tom", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -41.5 },
	    { name: "paandorasbeta sonor hihat (closed)", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -17 },
	    { name: "paandorasbeta sonor hihat (half opened)", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -21 },
	    { name: "paandorasbeta sonor hihat (open)", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -54.5 },
	    { name: "paandorasbeta sonor hihat (open tip)", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -43.5 },
	    { name: "paandorasbeta sonor hihat (pedal)", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -28 },
	    { name: "paandorasbeta sonor crash", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -51 },
	    { name: "paandorasbeta sonor crash (tip)", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -50.5 },
	    { name: "paandorasbeta sonor ride", expression: 1.0, isSampled: true, isPercussion: true, extraSampleDetune: -46 }
	];

	sampleLoadingState.totalSamples += chipWaves.length;

	// This assumes that Config.rawRawChipWaves and Config.chipWaves have
	// the same number of elements.
	const startIndex: number = Config.rawRawChipWaves.length;
	for (const chipWave of chipWaves) {
	    const chipWaveIndex: number = Config.rawRawChipWaves.length;
	    const rawChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultSamples };
	    const rawRawChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultSamples };
	    const integratedChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultIntegratedSamples };
	    Config.rawRawChipWaves[chipWaveIndex] = rawRawChipWave;
	    Config.rawRawChipWaves.dictionary[chipWave.name] = rawRawChipWave;
	    Config.rawChipWaves[chipWaveIndex] = rawChipWave;
	    Config.rawChipWaves.dictionary[chipWave.name] = rawChipWave;
	    Config.chipWaves[chipWaveIndex] = integratedChipWave;
	    Config.chipWaves.dictionary[chipWave.name] = rawChipWave;
	    sampleLoadingState.statusTable[chipWaveIndex] = SampleLoadingStatus.loading;
	    sampleLoadingState.urlTable[chipWaveIndex] = "legacySamples";
	}

	loadScript("samples.js")
	.then(() => loadScript("samples2.js"))
	.then(() => loadScript("samples3.js"))
	.then(() => loadScript("drumsamples.js"))
	.then(() => loadScript("wario_samples.js"))
	.then(() => loadScript("kirby_samples.js"))
	.then(() => {
	    // Now put the right sounds in there after everything
	    // got loaded.
	    const chipWaveSamples: Float32Array[] = [
		centerWave(kicksample),
		centerWave(snaresample),
		centerWave(pianosample),
		centerWave(WOWsample),
		centerWave(overdrivesample),
		centerWave(trumpetsample),
		centerWave(saxophonesample),
		centerWave(orchhitsample),
		centerWave(detatchedviolinsample),
		centerWave(synthsample),
		centerWave(sonic3snaresample),
		centerWave(comeonsample),
		centerWave(choirsample),
		centerWave(overdrivensample),
		centerWave(flutesample),
		centerWave(legatoviolinsample),
		centerWave(tremoloviolinsample),
		centerWave(amenbreaksample),
		centerWave(pizzicatoviolinsample),
		centerWave(timallengruntsample),
		centerWave(tubasample),
		centerWave(loopingcymbalsample),
		centerWave(kickdrumsample),
		centerWave(snaredrumsample),
		centerWave(closedhihatsample),
		centerWave(foothihatsample),
		centerWave(openhihatsample),
		centerWave(crashsample),
		centerWave(pianoC4sample),
		centerWave(liverpadsample),
		centerWave(marimbasample),
		centerWave(susdotwavsample),
		centerWave(wackyboxttssample),
		centerWave(peppersteak1),
		centerWave(peppersteak2),
		centerWave(vinyl),
		centerWave(slapbass),
		centerWave(hdeboverdrive),
		centerWave(sunsoftbass),
		centerWave(masculinechoir),
		centerWave(femininechoir),
		centerWave(southtololoche),
		centerWave(harp),
		centerWave(panflute),
		centerWave(krumhorn),
		centerWave(timpani),
		centerWave(crowdhey),
		centerWave(warioland4brass),
		centerWave(warioland4organ),
		centerWave(warioland4daow),
		centerWave(warioland4hourchime),
		centerWave(warioland4tick),
		centerWave(kirbykick),
		centerWave(kirbysnare),
		centerWave(kirbybongo),
		centerWave(kirbyclick),
		centerWave(funkkick),
		centerWave(funksnare),
		centerWave(funksnareleft),
		centerWave(funksnareright),
		centerWave(funktomhigh),
		centerWave(funktomlow),
		centerWave(funkhihatclosed),
		centerWave(funkhihathalfopen),
		centerWave(funkhihatopen),
		centerWave(funkhihatopentip),
		centerWave(funkhihatfoot),
		centerWave(funkcrash),
		centerWave(funkcrashtip),
		centerWave(funkride)
	    ];
	    let chipWaveIndexOffset: number = 0;
	    for (const chipWaveSample of chipWaveSamples) {
		const chipWaveIndex: number = startIndex + chipWaveIndexOffset;
		Config.rawChipWaves[chipWaveIndex].samples = chipWaveSample;
		Config.rawRawChipWaves[chipWaveIndex].samples = chipWaveSample;
		Config.chipWaves[chipWaveIndex].samples = performIntegral(chipWaveSample);
		sampleLoadingState.statusTable[chipWaveIndex] = SampleLoadingStatus.loaded;
		sampleLoadingState.samplesLoaded++;
		sampleLoadEvents.dispatchEvent(new SampleLoadedEvent(
		    sampleLoadingState.totalSamples,
		    sampleLoadingState.samplesLoaded,
		    sampleLoadingState.samplesFailed
		));
		chipWaveIndexOffset++;
	    }
	});
	//EditorConfig.presetCategories[EditorConfig.presetCategories.length] = {name: "Legacy Sample Presets", presets:  { name: "Earthbound O. Guitar", midiProgram: 80, settings: { "type": "chip", "eqFilter": [], "effects": [], "transition": "normal", "fadeInSeconds": 0, "fadeOutTicks": -1, "chord": "arpeggio", "wave": "paandorasbox overdrive", "unison": "none", "envelopes": [] } }, index: EditorConfig.presetCategories.length,};
    }
    else if (set == 1) {
	// Create chip waves with the wrong sound.
	const chipWaves = [
	    { name: "chronoperc1final", expression: 4.0, isSampled: true, isPercussion: true, extraSampleDetune: 0 },
	    { name: "synthkickfm", expression: 4.0, isSampled: true, isPercussion: true, extraSampleDetune: 0 },
	    { name: "mcwoodclick1", expression: 4.0, isSampled: true, isPercussion: true, extraSampleDetune: 0 },
	    { name: "acoustic snare", expression: 4.0, isSampled: true, isPercussion: true, extraSampleDetune: 0 }
	];

	sampleLoadingState.totalSamples += chipWaves.length;

	// This assumes that Config.rawRawChipWaves and Config.chipWaves have
	// the same number of elements.
	const startIndex: number = Config.rawRawChipWaves.length;
	for (const chipWave of chipWaves) {
	    const chipWaveIndex: number = Config.rawRawChipWaves.length;
	    const rawChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultSamples };
	    const rawRawChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultSamples };
	    const integratedChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultIntegratedSamples };
	    Config.rawRawChipWaves[chipWaveIndex] = rawRawChipWave;
	    Config.rawRawChipWaves.dictionary[chipWave.name] = rawRawChipWave;
	    Config.rawChipWaves[chipWaveIndex] = rawChipWave;
	    Config.rawChipWaves.dictionary[chipWave.name] = rawChipWave;
	    Config.chipWaves[chipWaveIndex] = integratedChipWave;
	    Config.chipWaves.dictionary[chipWave.name] = rawChipWave;
	    sampleLoadingState.statusTable[chipWaveIndex] = SampleLoadingStatus.loading;
	    sampleLoadingState.urlTable[chipWaveIndex] = "nintariboxSamples";
	}

	loadScript("nintaribox_samples.js")
	.then(() => {
	    // Now put the right sounds in there after everything
	    // got loaded.
	    const chipWaveSamples: Float32Array[] = [
		centerWave(chronoperc1finalsample),
		centerWave(synthkickfmsample),
		centerWave(woodclicksample),
		centerWave(acousticsnaresample)
	    ];
	    let chipWaveIndexOffset: number = 0;
	    for (const chipWaveSample of chipWaveSamples) {
		const chipWaveIndex: number = startIndex + chipWaveIndexOffset;
		Config.rawChipWaves[chipWaveIndex].samples = chipWaveSample;
		Config.rawRawChipWaves[chipWaveIndex].samples = chipWaveSample;
		Config.chipWaves[chipWaveIndex].samples = performIntegral(chipWaveSample);
		sampleLoadingState.statusTable[chipWaveIndex] = SampleLoadingStatus.loaded;
		sampleLoadingState.samplesLoaded++;
		sampleLoadEvents.dispatchEvent(new SampleLoadedEvent(
		    sampleLoadingState.totalSamples,
		    sampleLoadingState.samplesLoaded,
		    sampleLoadingState.samplesFailed
		));
		chipWaveIndexOffset++;
	    }
	});
    }
    else if (set == 2) {
	// Create chip waves with the wrong sound.
	const chipWaves = [
	    { name: "cat", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: -3 },
	    { name: "gameboy", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: 7 },
	    { name: "mario", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: 0 },
	    { name: "drum", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: 4 },
	    { name: "yoshi", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: -16 },
	    { name: "star", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: -16 },
	    { name: "fire flower", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: -1 },
	    { name: "dog", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: -1 },
	    { name: "oink", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: 3 },
	    { name: "swan", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: 1 },
	    { name: "face", expression: 1, isSampled: true, isPercussion: false, extraSampleDetune: -12 }
	];

	sampleLoadingState.totalSamples += chipWaves.length;

	// This assumes that Config.rawRawChipWaves and Config.chipWaves have
	// the same number of elements.
	const startIndex: number = Config.rawRawChipWaves.length;
	for (const chipWave of chipWaves) {
	    const chipWaveIndex: number = Config.rawRawChipWaves.length;
	    const rawChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultSamples };
	    const rawRawChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultSamples };
	    const integratedChipWave = { index: chipWaveIndex, name: chipWave.name, expression: chipWave.expression, isSampled: chipWave.isSampled, isPercussion: chipWave.isPercussion, extraSampleDetune: chipWave.extraSampleDetune, samples: defaultIntegratedSamples };
	    Config.rawRawChipWaves[chipWaveIndex] = rawRawChipWave;
	    Config.rawRawChipWaves.dictionary[chipWave.name] = rawRawChipWave;
	    Config.rawChipWaves[chipWaveIndex] = rawChipWave;
	    Config.rawChipWaves.dictionary[chipWave.name] = rawChipWave;
	    Config.chipWaves[chipWaveIndex] = integratedChipWave;
	    Config.chipWaves.dictionary[chipWave.name] = rawChipWave;
	    sampleLoadingState.statusTable[chipWaveIndex] = SampleLoadingStatus.loading;
	    sampleLoadingState.urlTable[chipWaveIndex] = "marioPaintboxSamples";
	}

	loadScript("mario_paintbox_samples.js")
	.then(() => {
	    // Now put the right sounds in there after everything
	    // got loaded.
	    const chipWaveSamples: Float32Array[] = [
		centerWave(catpaintboxsample),
		centerWave(gameboypaintboxsample),
		centerWave(mariopaintboxsample),
		centerWave(drumpaintboxsample),
		centerWave(yoshipaintboxsample),
		centerWave(starpaintboxsample),
		centerWave(fireflowerpaintboxsample),
		centerWave(dogpaintbox),
		centerWave(oinkpaintbox),
		centerWave(swanpaintboxsample),
		centerWave(facepaintboxsample)
	    ];
	    let chipWaveIndexOffset: number = 0;
	    for (const chipWaveSample of chipWaveSamples) {
		const chipWaveIndex: number = startIndex + chipWaveIndexOffset;
		Config.rawChipWaves[chipWaveIndex].samples = chipWaveSample;
		Config.rawRawChipWaves[chipWaveIndex].samples = chipWaveSample;
		Config.chipWaves[chipWaveIndex].samples = performIntegral(chipWaveSample);
		sampleLoadingState.statusTable[chipWaveIndex] = SampleLoadingStatus.loaded;
		sampleLoadingState.samplesLoaded++;
		sampleLoadEvents.dispatchEvent(new SampleLoadedEvent(
		    sampleLoadingState.totalSamples,
		    sampleLoadingState.samplesLoaded,
            sampleLoadingState.samplesFailed
		));
		chipWaveIndexOffset++;
	    }
	});
    }
    else {
        console.log("invalid set of built-in samples");
    }
}

export class Config {
    // Params for post-processing compressor
    public static thresholdVal: number = -10;
    public static kneeVal: number = 40;
    public static ratioVal: number = 12;
    public static attackVal: number = 0;
    public static releaseVal: number = 0.25;

    public static willReloadForCustomSamples: boolean = false;

    public static jsonFormat: string = "froupbox";
    // public static thurmboxImportUrl: string = "https://file.garden/ZMQ0Om5nmTe-x2hq/PandoraArchive%20Samples/";

    public static readonly scales: DictionaryArray<Scale> = toNameMap([
        
        { name: "Free", realName: "chromatic", intervals: "" }, // Free - this scale is overriden to use all notes in the current tuning

        { name: "Major", realName: "ionian", intervals: "1/1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8" }, // Major
        { name: "Minor", realName: "aeolian", intervals: "1/1, 9/8, 6/5, 4/3, 3/2, 8/5, 9/5" }, // Minor
        { name: "Mixolydian", realName: "mixolydian", intervals: "1/1, 10/9, 5/4, 4/3, 3/2, 5/3, 16/9" }, // Mixolydian
        { name: "Lydian", realName: "lydian", intervals: "1/1, 9/8, 5/4, 45/32, 3/2, 27/16, 15/8" }, // Lydian
        { name: "Dorian", realName: "dorian", intervals: "1/1, 10/9, 32/27, 4/3, 40/27, 5/3, 16/9" }, // Dorian
        { name: "Phrygian", realName: "phrygian", intervals: "1/1, 16/15, 6/5, 4/3, 3/2, 8/5, 16/9" }, // Phrygian
        { name: "Locrian", realName: "locrian", intervals: "1/1, 16/15, 32/27, 4/3, 64/45, 8/5, 16/9" }, // Locrian

        { name: "Supermajor", realName: "septimal supermajor", intervals: "1/1, 8/7, 9/7, 10/7, 3/2, 12/7, 27/14" }, // Septimal Supermajor
        { name: "Neutral", realName: "undecimal neutral", intervals: "1/1, 12/11, 11/9, 11/8, 3/2, 18/11, 11/6" }, // Undecimal Neutral
        { name: "Subminor", realName: "septimal subminor", intervals: "1/1, 28/27, 7/6, 21/16, 3/2, 14/9, 7/4" }, // Septimal Subminor

        { name: "Lydian Dominant", realName: "lydian dominant", intervals: "1/1, 9/8, 5/4, 45/32, 3/2, 27/16, 16/9" }, // Lydian Dominant
        { name: "Phrygian Dominant", realName: "phrygian dominant", intervals: "1/1, 16/15, 5/4, 4/3, 3/2, 8/5, 16/9" }, // Phrygian Dominant
        { name: "Harmonic Major", realName: "harmonic major", intervals: "1/1, 9/8, 5/4, 4/3, 3/2, 25/16, 15/8" }, // Harmonic Major
        { name: "Harmonic Minor", realName: "harmonic minor", intervals: "1/1, 9/8, 6/5, 4/3, 3/2, 8/5, 15/8" }, // Harmonic Minor
        { name: "Melodic Minor", realName: "melodic minor", intervals: "1/1, 9/8, 6/5, 4/3, 3/2, 27/16, 15/8" }, // Melodic Minor
        { name: "Blues", realName: "blues major", intervals: "1/1, 9/8, 7/6, 5/4, 3/2, 5/3" }, // Blues Major
        { name: "Blues Minor", realName: "blues", intervals: "1/1, 6/5, 4/3, 7/5, 3/2, 9/5" }, // Blues
        { name: "Altered", realName: "altered", intervals: "1/1, 16/15, 32/27, 32/25, 64/45, 8/5, 16/9" }, // Altered
        { name: "Pentatonic Major", realName: "major pentatonic", intervals: "1/1, 9/8, 5/4, 3/2, 5/3" }, // Major Pentatonic
        { name: "Pentatonic Minor", realName: "minor pentatonic", intervals: "1/1, 6/5, 4/3, 3/2, 9/5" }, // Minor Pentatonic
        { name: "Whole Tone", realName: "whole tone", intervals: "1/1, 9/8, 5/4, 45/32, 8/5, 16/9" }, // Whole Tone
        { name: "Octatonic", realName: "octatonic", intervals: "1/1, 9/8, 6/5, 27/20, 64/45, 8/5, 5/3, 15/8" }, // Octatonic
        { name: "Hexatonic", realName: "hexatonic", intervals: "1/1, 75/64, 5/4, 3/2, 25/16, 15/8" }, // Hexatonic

        { name: "Septimal", realName: "septimal", intervals: "1/1, 9/8, 7/6, 21/16, 4/3, 3/2, 7/4" }, // Septimal
        { name: "Expanded Septimal", realName: "expanded septimal", intervals: "1/1, 35/32, 9/8, 7/6, 5/4, 21/16, 4/3, 3/2, 5/3, 7/4, 15/8" }, // Expanded Septimal
        { name: "Undecimal", realName: "undecimal", intervals: "1/1, 33/32, 9/8, 4/3, 11/8, 3/2, 11/6" }, // Undecimal
        { name: "Expanded Undecimal", realName: "expanded undecimal", intervals: "1/1, 33/32, 35/32, 9/8, 7/6, 77/64, 5/4, 21/16, 4/3, 11/8, 3/2, 5/3, 55/32, 7/4, 11/6, 15/8" }, // Expanded Undecimal
        { name: "Tridecimal", realName: "tridecimal", intervals: "1/1, 13/12, 9/8, 39/32, 4/3, 3/2, 13/8" }, // Tridecimal
        { name: "Expanded Tridecimal", realName: "expanded tridecimal", intervals: "1/1, 65/64, 33/32, 13/12, 35/32, 143/128, 9/8, 7/6, 77/64, 39/32, 5/4, 21/16, 4/3, 11/8, 91/64, 3/2, 13/8, 5/3, 55/32, 7/4, 11/6, 15/8" }, // Expanded Tridecimal

        { name: "Harmonics 4-8", realName: "harmonics 4-8", intervals: "4, 5, 6, 7, 8" }, // Harmonics 4-8
        { name: "Harmonics 8-16", realName: "harmonics 8-16", intervals: "8, 9, 10, 11, 12, 13, 14, 15, 16" }, // Harmonics 8-16
        { name: "Harmonics 16-32", realName: "harmonics 16-32", intervals: "16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32" }, // Harmonics 16-32
        
        { name: "Custom", realName: "custom", intervals: "1/1, 5/4, 3/2, 7/4" }, // Custom - this scale is configurable
         
    ]);
    public static readonly keys: DictionaryArray<Key> = toNameMap([
        { name: "C", isWhiteKey: true, basePitch: 12 }, // C0 has index 12 on the MIDI scale. C7 is 96, and C9 is 120. C10 is barely in the audible range.
        { name: "C♯", isWhiteKey: false, basePitch: 13 },
        { name: "D", isWhiteKey: true, basePitch: 14 },
        { name: "D♯", isWhiteKey: false, basePitch: 15 },
        { name: "E", isWhiteKey: true, basePitch: 16 },
        { name: "F", isWhiteKey: true, basePitch: 17 },
        { name: "F♯", isWhiteKey: false, basePitch: 18 },
        { name: "G", isWhiteKey: true, basePitch: 19 },
        { name: "G♯", isWhiteKey: false, basePitch: 20 },
        { name: "A", isWhiteKey: true, basePitch: 21 },
        { name: "A♯", isWhiteKey: false, basePitch: 22 },
        { name: "B", isWhiteKey: true, basePitch: 23 },
    ]); 
    public static readonly blackKeyNameParents: ReadonlyArray<number> = [-1, 1, -1, 1, -1, 1, -1, -1, 1, -1, 1, -1];
    public static readonly tempoMin:                    number = 1;
    public static readonly tempoMax:                    number = 200000; //slarmoo 500, froup 2000
    public static readonly octaveMin:                   number = -16; //slarmoo -2, froup -8
    public static readonly octaveMax:                   number = 16; //slarmoo 2, froup 8
    public static readonly echoDelayRange:              number = 24;
    public static readonly echoDelayStepTicks:          number = 4;
    public static readonly echoSustainRange:            number = 8;
    public static readonly echoShelfHz:                 number = 4000.0; // The cutoff freq of the shelf filter that is used to decay echoes.
    public static readonly echoShelfGain:               number = Math.pow(2.0, -0.5);
    public static readonly reverbShelfHz:               number = 8000.0; // The cutoff freq of the shelf filter that is used to decay reverb.
    public static readonly reverbShelfGain:             number = Math.pow(2.0, -1.5);
    public static readonly reverbRange:                 number = 32; //froup 32
    public static readonly reverbDelayBufferSize:       number = 16384; // TODO: Compute a buffer size based on sample rate.
    public static readonly reverbDelayBufferMask:       number = Config.reverbDelayBufferSize - 1; // TODO: Compute a buffer size based on sample rate.
    public static readonly phaserMixRange:              number = 32; 
    public static readonly phaserFeedbackRange:         number = 32; 
    public static readonly phaserFreqRange:             number = 32; 
    public static readonly phaserMinFreq:               number = 8.0; 
    public static readonly phaserMaxFreq:               number = 20000.0; 
    public static readonly phaserMinStages:             number = 0; 
    public static readonly phaserMaxStages:             number = 1024; 
    public static readonly flangerMixRange:             number = 64; 
    public static readonly flangerMinVoices:            number = 1; 
    public static readonly flangerMaxVoices:            number = 64; 
    public static readonly flangerDelayMin:             number = 0;
    public static readonly flangerDelayMax:             number = 8191;
    public static readonly flangerPanCenter:            number = 50;
    public static readonly flangerPanMax:               number = Config.flangerPanCenter * 2;
    public static readonly flangerFeedmixRange:         number = 64; 
    public static readonly beatsPerBarMin:              number = 1;
    public static readonly beatsPerBarMax:              number = 256; //slarmoo: 64
    public static readonly barCountMin:                 number = 1;
    public static readonly barCountMax:                 number = 20000; //slarmoo: 1024, froupbox: 4096
    public static readonly instrumentCountMin:          number = 1;
    public static readonly layeredInstrumentCountMax:   number = 20; //froupbox: 10
    public static readonly patternInstrumentCountMax:   number = 20; //froupbox: 10
	public static readonly partsPerBeat:                number = 24;
	public static readonly ticksPerPart:                number = 2;
	public static readonly ticksPerArpeggio:            number = 3;
	public static readonly arpeggioPatterns:            ReadonlyArray<ReadonlyArray<number>> = [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6, 7] ];
	public static readonly rhythms:                     DictionaryArray<Rhythm> = toNameMap([
		// ÷1, ÷2, ÷16, and ÷48 are taken from DinoBox
        // { name: "÷1", stepsPerBeat: 1, /*ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 0, 1, 1], [0, 1, 2, 1]],*/ roundUpThresholds: null},
		// { name: "÷2", stepsPerBeat: 2, /*ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 0, 1, 1], [0, 1, 2, 1]],*/ roundUpThresholds: null},
        { name: "÷3 (triplets)", stepsPerBeat: 3, /*ticksPerArpeggio: 4, arpeggioPatterns: [[0], [0, 0, 1, 1], [0, 1, 2, 1], [0, 1, 2, 3]]*/ roundUpThresholds: [/*0*/ 5, /*8*/ 12, /*16*/ 18 /*24*/] },
		{ name: "÷4 (standard)", stepsPerBeat: 4, /*ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 0, 1, 1], [0, 1, 2, 1], [0, 1, 2, 3]]*/ roundUpThresholds: [/*0*/ 3, /*6*/ 9, /*12*/ 17, /*18*/ 21 /*24*/] },
		{ name: "÷6", stepsPerBeat: 6, /*ticksPerArpeggio: 4, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3]]*/ roundUpThresholds: null },
		{ name: "÷8", stepsPerBeat: 8, /*ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3]]*/ roundUpThresholds: null },
        { name: "÷12", stepsPerBeat: 12, /*ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1]]*/ roundUpThresholds: null },
        // { name: "÷16", stepsPerBeat: 16, /*ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1]],*/ roundUpThresholds: null},
		{ name: "freehand (÷24)", stepsPerBeat: 24, /*ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3]]*/ roundUpThresholds: null },
        // { name: "absolute freedom (÷48)",stepsPerBeat: 48, /*ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1],[0, 1, 2, 1]],*/ roundUpThresholds: null},
	]);

    public static readonly instrumentTypeNames: ReadonlyArray<string> = ["chip", "FM", "noise", "spectrum", "drumset", "harmonics", "PWM", "Picked String", "supersaw", "custom chip", "mod", "FM6op"];
    public static readonly instrumentTypeHasSpecialInterval: ReadonlyArray<boolean> = [true, true, false, false, false, true, false, false, false, false, false];
    public static readonly chipBaseExpression: number = 0.03375; // Doubled by unison feature, but affected by expression adjustments per unison setting and wave shape. Custom chip is multiplied by 0.05 in instrumentState.updateWaves
    public static readonly fmBaseExpression: number = 0.03;
    public static readonly noiseBaseExpression: number = 0.19;
    public static readonly spectrumBaseExpression: number = 0.3; // Spectrum can be in pitch or noise channels, the expression is doubled for noise.
    public static readonly drumsetBaseExpression: number = 0.45; // Drums tend to be loud but brief!
    public static readonly harmonicsBaseExpression: number = 0.025;
    public static readonly pwmBaseExpression: number = 0.04725; // It's actually closer to half of this, the synthesized pulse amplitude range is only .5 to -.5, but also note that the fundamental sine partial amplitude of a square wave is 4/π times the measured square wave amplitude.
    public static readonly supersawBaseExpression: number = 0.061425; // It's actually closer to half of this, the synthesized sawtooth amplitude range is only .5 to -.5.
    public static readonly pickedStringBaseExpression: number = 0.025; // Same as harmonics.
    public static readonly distortionBaseVolume: number = 0.011; // Distortion is not affected by pitchDamping, which otherwise approximately halves expression for notes around the middle of the range.
    public static readonly bitcrusherBaseVolume: number = 0.010; // Also not affected by pitchDamping, used when bit crushing is maxed out (aka "1-bit" output).
    public static readonly granularOutputLoudnessCompensation: number = 0.5; //compensate for multiple grains playing at once
    public static rawChipWaves: DictionaryArray<ChipWave> = toNameMap([
        { name: "rounded", expression: 0.94, samples: centerWave([0.0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.95, 0.9, 0.85, 0.8, 0.7, 0.6, 0.5, 0.4, 0.2, 0.0, -0.2, -0.4, -0.5, -0.6, -0.7, -0.8, -0.85, -0.9, -0.95, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -0.95, -0.9, -0.85, -0.8, -0.7, -0.6, -0.5, -0.4, -0.2]) },
        { name: "triangle", expression: 1.0, samples: centerWave([1.0 / 15.0, 3.0 / 15.0, 5.0 / 15.0, 7.0 / 15.0, 9.0 / 15.0, 11.0 / 15.0, 13.0 / 15.0, 15.0 / 15.0, 15.0 / 15.0, 13.0 / 15.0, 11.0 / 15.0, 9.0 / 15.0, 7.0 / 15.0, 5.0 / 15.0, 3.0 / 15.0, 1.0 / 15.0, -1.0 / 15.0, -3.0 / 15.0, -5.0 / 15.0, -7.0 / 15.0, -9.0 / 15.0, -11.0 / 15.0, -13.0 / 15.0, -15.0 / 15.0, -15.0 / 15.0, -13.0 / 15.0, -11.0 / 15.0, -9.0 / 15.0, -7.0 / 15.0, -5.0 / 15.0, -3.0 / 15.0, -1.0 / 15.0]) },
        { name: "square", expression: 0.5, samples: centerWave([1.0, -1.0]) },
        { name: "1/4 pulse", expression: 0.5, samples: centerWave([1.0, -1.0, -1.0, -1.0]) },
        { name: "1/8 pulse", expression: 0.5, samples: centerWave([1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0]) },
        { name: "sawtooth", expression: 0.65, samples: centerWave([1.0 / 31.0, 3.0 / 31.0, 5.0 / 31.0, 7.0 / 31.0, 9.0 / 31.0, 11.0 / 31.0, 13.0 / 31.0, 15.0 / 31.0, 17.0 / 31.0, 19.0 / 31.0, 21.0 / 31.0, 23.0 / 31.0, 25.0 / 31.0, 27.0 / 31.0, 29.0 / 31.0, 31.0 / 31.0, -31.0 / 31.0, -29.0 / 31.0, -27.0 / 31.0, -25.0 / 31.0, -23.0 / 31.0, -21.0 / 31.0, -19.0 / 31.0, -17.0 / 31.0, -15.0 / 31.0, -13.0 / 31.0, -11.0 / 31.0, -9.0 / 31.0, -7.0 / 31.0, -5.0 / 31.0, -3.0 / 31.0, -1.0 / 31.0]) },
        { name: "double saw", expression: 0.5, samples: centerWave([0.0, -0.2, -0.4, -0.6, -0.8, -1.0, 1.0, -0.8, -0.6, -0.4, -0.2, 1.0, 0.8, 0.6, 0.4, 0.2]) },
        { name: "double pulse", expression: 0.4, samples: centerWave([1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0]) },
        { name: "spiky", expression: 0.4, samples: centerWave([1.0, -1.0, 1.0, -1.0, 1.0, 0.0]) },
        { name: "sine", expression: 0.88, samples: centerAndNormalizeWave([8.0, 9.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.0, 15.0, 15.0, 14.0, 14.0, 13.0, 11.0, 10.0, 9.0, 7.0, 6.0, 4.0, 3.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 2.0, 4.0, 5.0, 6.0]) },
        { name: "flute", expression: 0.8, samples: centerAndNormalizeWave([3.0, 4.0, 6.0, 8.0, 10.0, 11.0, 13.0, 14.0, 15.0, 15.0, 14.0, 13.0, 11.0, 8.0, 5.0, 3.0]) },
        { name: "harp", expression: 0.8, samples: centerAndNormalizeWave([0.0, 3.0, 3.0, 3.0, 4.0, 5.0, 5.0, 6.0, 7.0, 8.0, 9.0, 11.0, 11.0, 13.0, 13.0, 15.0, 15.0, 14.0, 12.0, 11.0, 10.0, 9.0, 8.0, 7.0, 7.0, 5.0, 4.0, 3.0, 2.0, 1.0, 0.0, 0.0]) },
        { name: "sharp clarinet", expression: 0.38, samples: centerAndNormalizeWave([0.0, 0.0, 0.0, 1.0, 1.0, 8.0, 8.0, 9.0, 9.0, 9.0, 8.0, 8.0, 8.0, 8.0, 8.0, 9.0, 9.0, 7.0, 9.0, 9.0, 10.0, 4.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]) },
        { name: "soft clarinet", expression: 0.45, samples: centerAndNormalizeWave([0.0, 1.0, 5.0, 8.0, 9.0, 9.0, 9.0, 9.0, 9.0, 9.0, 9.0, 11.0, 11.0, 12.0, 13.0, 12.0, 10.0, 9.0, 7.0, 6.0, 4.0, 3.0, 3.0, 3.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]) },
        { name: "alto sax", expression: 0.3, samples: centerAndNormalizeWave([5.0, 5.0, 6.0, 4.0, 3.0, 6.0, 8.0, 7.0, 2.0, 1.0, 5.0, 6.0, 5.0, 4.0, 5.0, 7.0, 9.0, 11.0, 13.0, 14.0, 14.0, 14.0, 14.0, 13.0, 10.0, 8.0, 7.0, 7.0, 4.0, 3.0, 4.0, 2.0]) },
        { name: "bassoon", expression: 0.35, samples: centerAndNormalizeWave([9.0, 9.0, 7.0, 6.0, 5.0, 4.0, 4.0, 4.0, 4.0, 5.0, 7.0, 8.0, 9.0, 10.0, 11.0, 13.0, 13.0, 11.0, 10.0, 9.0, 7.0, 6.0, 4.0, 2.0, 1.0, 1.0, 1.0, 2.0, 2.0, 5.0, 11.0, 14.0]) },
        { name: "trumpet", expression: 0.22, samples: centerAndNormalizeWave([10.0, 11.0, 8.0, 6.0, 5.0, 5.0, 5.0, 6.0, 7.0, 7.0, 7.0, 7.0, 6.0, 6.0, 7.0, 7.0, 7.0, 7.0, 7.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 7.0, 8.0, 9.0, 11.0, 14.0]) },
        { name: "electric guitar", expression: 0.2, samples: centerAndNormalizeWave([11.0, 12.0, 12.0, 10.0, 6.0, 6.0, 8.0, 0.0, 2.0, 4.0, 8.0, 10.0, 9.0, 10.0, 1.0, 7.0, 11.0, 3.0, 6.0, 6.0, 8.0, 13.0, 14.0, 2.0, 0.0, 12.0, 8.0, 4.0, 13.0, 11.0, 10.0, 13.0]) },
        { name: "organ", expression: 0.2, samples: centerAndNormalizeWave([11.0, 10.0, 12.0, 11.0, 14.0, 7.0, 5.0, 5.0, 12.0, 10.0, 10.0, 9.0, 12.0, 6.0, 4.0, 5.0, 13.0, 12.0, 12.0, 10.0, 12.0, 5.0, 2.0, 2.0, 8.0, 6.0, 6.0, 5.0, 8.0, 3.0, 2.0, 1.0]) },
        { name: "pan flute", expression: 0.35, samples: centerAndNormalizeWave([1.0, 4.0, 7.0, 6.0, 7.0, 9.0, 7.0, 7.0, 11.0, 12.0, 13.0, 15.0, 13.0, 11.0, 11.0, 12.0, 13.0, 10.0, 7.0, 5.0, 3.0, 6.0, 10.0, 7.0, 3.0, 3.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0]) },
        { name: "glitch", expression: 0.5, samples: centerWave([1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0]) },
        { name: "trapezoid", expression: 1.0, samples: centerWave([1.0 / 15.0, 6.0 / 15.0, 10.0 / 15.0, 14.0 / 15.0, 15.0 / 15.0, 15.0 / 15.0, 15.0 / 15.0, 15.0 / 15.0, 15.0 / 15.0, 15.0 / 15.0, 15.0 / 15.0, 15.0 / 15.0, 14.0 / 15.0, 10.0 / 15.0, 6.0 / 15.0, 1.0 / 15.0, -1.0 / 15.0, -6.0 / 15.0, -10.0 / 15.0, -14.0 / 15.0, -15.0 / 15.0, -15.0 / 15.0, -15.0 / 15.0, -15.0 / 15.0, -15.0 / 15.0, -15.0 / 15.0, -15.0 / 15.0, -15.0 / 15.0, -14.0 / 15.0, -10.0 / 15.0, -6.0 / 15.0, -1.0 / 15.0,]) },
        // modbox
        { name: "modbox 10% pulse", expression: 0.5, samples: centerAndNormalizeWave([1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0]) },
        { name: "modbox sunsoft bass", expression: 1.0, samples: centerAndNormalizeWave([0.0, 0.1875, 0.3125, 0.5625, 0.5, 0.75, 0.875, 1.0, 1.0, 0.6875, 0.5, 0.625, 0.625, 0.5, 0.375, 0.5625, 0.4375, 0.5625, 0.4375, 0.4375, 0.3125, 0.1875, 0.1875, 0.375, 0.5625, 0.5625, 0.5625, 0.5625, 0.5625, 0.4375, 0.25, 0.0]) },
        { name: "modbox loud pulse", expression: 0.5, samples: centerAndNormalizeWave([1.0, 0.7, 0.1, 0.1, 0, 0, 0, 0, 0, 0.1, 0.2, 0.15, 0.25, 0.125, 0.215, 0.345, 4.0]) },
        { name: "modbox sax", expression: 0.5, samples: centerAndNormalizeWave([1.0 / 15.0, 3.0 / 15.0, 5.0 / 15.0, 9.0, 0.06]) },
        { name: "modbox guitar", expression: 0.5, samples: centerAndNormalizeWave([-0.5, 3.5, 3.0, -0.5, -0.25, -1.0]) },
        { name: "modbox sine", expression: 0.5, samples: centerAndNormalizeWave([0.0, 0.05, 0.125, 0.2, 0.25, 0.3, 0.425, 0.475, 0.525, 0.625, 0.675, 0.725, 0.775, 0.8, 0.825, 0.875, 0.9, 0.925, 0.95, 0.975, 0.98, 0.99, 0.995, 1, 0.995, 0.99, 0.98, 0.975, 0.95, 0.925, 0.9, 0.875, 0.825, 0.8, 0.775, 0.725, 0.675, 0.625, 0.525, 0.475, 0.425, 0.3, 0.25, 0.2, 0.125, 0.05, 0.0, -0.05, -0.125, -0.2, -0.25, -0.3, -0.425, -0.475, -0.525, -0.625, -0.675, -0.725, -0.775, -0.8, -0.825, -0.875, -0.9, -0.925, -0.95, -0.975, -0.98, -0.99, -0.995, -1, -0.995, -0.99, -0.98, -0.975, -0.95, -0.925, -0.9, -0.875, -0.825, -0.8, -0.775, -0.725, -0.675, -0.625, -0.525, -0.475, -0.425, -0.3, -0.25, -0.2, -0.125, -0.05]) },
        { name: "modbox atari bass", expression: 0.5, samples: centerAndNormalizeWave([1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0]) },
        { name: "modbox atari pulse", expression: 0.5, samples: centerAndNormalizeWave([1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]) },
        { name: "modbox 1% pulse", expression: 0.5, samples: centerAndNormalizeWave([1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0]) },
        { name: "modbox curved sawtooth", expression: 0.5, samples: centerAndNormalizeWave([1.0, 1.0 / 2.0, 1.0 / 3.0, 1.0 / 4.0]) },
        { name: "modbox viola", expression: 0.45, samples: centerAndNormalizeWave([-0.9, -1.0, -0.85, -0.775, -0.7, -0.6, -0.5, -0.4, -0.325, -0.225, -0.2, -0.125, -0.1, -0.11, -0.125, -0.15, -0.175, -0.18, -0.2, -0.21, -0.22, -0.21, -0.2, -0.175, -0.15, -0.1, -0.5, 0.75, 0.11, 0.175, 0.2, 0.25, 0.26, 0.275, 0.26, 0.25, 0.225, 0.2, 0.19, 0.18, 0.19, 0.2, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.275, 0.28, 0.29, 0.3, 0.29, 0.28, 0.27, 0.26, 0.25, 0.225, 0.2, 0.175, 0.15, 0.1, 0.075, 0.0, -0.01, -0.025, 0.025, 0.075, 0.2, 0.3, 0.475, 0.6, 0.75, 0.85, 0.85, 1.0, 0.99, 0.95, 0.8, 0.675, 0.475, 0.275, 0.01, -0.15, -0.3, -0.475, -0.5, -0.6, -0.71, -0.81, -0.9, -1.0, -0.9]) },
        { name: "modbox brass", expression: 0.45, samples: centerAndNormalizeWave([-1.0, -0.95, -0.975, -0.9, -0.85, -0.8, -0.775, -0.65, -0.6, -0.5, -0.475, -0.35, -0.275, -0.2, -0.125, -0.05, 0.0, 0.075, 0.125, 0.15, 0.20, 0.21, 0.225, 0.25, 0.225, 0.21, 0.20, 0.19, 0.175, 0.125, 0.10, 0.075, 0.06, 0.05, 0.04, 0.025, 0.04, 0.05, 0.10, 0.15, 0.225, 0.325, 0.425, 0.575, 0.70, 0.85, 0.95, 1.0, 0.9, 0.675, 0.375, 0.2, 0.275, 0.4, 0.5, 0.55, 0.6, 0.625, 0.65, 0.65, 0.65, 0.65, 0.64, 0.6, 0.55, 0.5, 0.4, 0.325, 0.25, 0.15, 0.05, -0.05, -0.15, -0.275, -0.35, -0.45, -0.55, -0.65, -0.7, -0.78, -0.825, -0.9, -0.925, -0.95, -0.975]) },
        { name: "modbox acoustic bass", expression: 0.5, samples: centerAndNormalizeWave([1.0, 0.0, 0.1, -0.1, -0.2, -0.4, -0.3, -1.0]) },
        { name: "modbox lyre", expression: 0.45, samples: centerAndNormalizeWave([1.0, -1.0, 4.0, 2.15, 4.13, 5.15, 0.0, -0.05, 1.0]) },
        { name: "modbox ramp pulse", expression: 0.5, samples: centerAndNormalizeWave([6.1, -2.9, 1.4, -2.9]) },
        { name: "modbox piccolo", expression: 0.5, samples: centerAndNormalizeWave([1, 4, 2, 1, -0.1, -1, -0.12]) },
        { name: "modbox squaretooth", expression: 0.5, samples: centerAndNormalizeWave([0.2, 1.0, 2.6, 1.0, 0.0, -2.4]) },
        { name: "modbox flatline", expression: 1.0, samples: centerAndNormalizeWave([1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]) },
        { name: "modbox pnryshk a (u5)", expression: 0.4, samples: centerAndNormalizeWave([1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0]) },
        { name: "modbox pnryshk b (riff)", expression: 0.5, samples: centerAndNormalizeWave([1.0, -0.9, 0.8, -0.7, 0.6, -0.5, 0.4, -0.3, 0.2, -0.1, 0.0, -0.1, 0.2, -0.3, 0.4, -0.5, 0.6, -0.7, 0.8, -0.9, 1.0]) },
        // sandbox
        { name: "sandbox shrill lute", expression: 0.94, samples: centerAndNormalizeWave([1.0, 1.5, 1.25, 1.2, 1.3, 1.5]) },
        { name: "sandbox bassoon", expression: 0.5, samples: centerAndNormalizeWave([1.0, -1.0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]) },
        { name: "sandbox shrill bass", expression: 0.5, samples: centerAndNormalizeWave([0, 1, 0, 0, 1, 0, 1, 0, 0, 0]) },
        { name: "sandbox nes pulse", expression: 0.4, samples: centerAndNormalizeWave([2.1, -2.2, 1.2, 3]) },
        { name: "sandbox saw bass", expression: 0.25, samples: centerAndNormalizeWave([1, 1, 1, 1, 0, 2, 1, 2, 3, 1, -2, 1, 4, 1, 4, 2, 1, 6, -3, 4, 2, 1, 5, 1, 4, 1, 5, 6, 7, 1, 6, 1, 4, 1, 9]) },
        { name: "sandbox euphonium", expression: 0.3, samples: centerAndNormalizeWave([0, 1, 2, 1, 2, 1, 4, 2, 5, 0, -2, 1, 5, 1, 2, 1, 2, 4, 5, 1, 5, -2, 5, 10, 1]) },
        { name: "sandbox shrill pulse", expression: 0.3, samples: centerAndNormalizeWave([4 - 2, 0, 4, 1, 4, 6, 7, 3]) },
        { name: "sandbox r-sawtooth", expression: 0.2, samples: centerAndNormalizeWave([6.1, -2.9, 1.4, -2.9]) },
        { name: "sandbox recorder", expression: 0.2, samples: centerAndNormalizeWave([5.0, -5.1, 4.0, -4.1, 3.0, -3.1, 2.0, -2.1, 1.0, -1.1, 6.0]) },
        { name: "sandbox narrow saw", expression: 1.2, samples: centerAndNormalizeWave([0.1, 0.13 / -0.1, 0.13 / -0.3, 0.13 / -0.5, 0.13 / -0.7, 0.13 / -0.9, 0.13 / -0.11, 0.13 / -0.31, 0.13 / -0.51, 0.13 / -0.71, 0.13 / -0.91, 0.13 / -0.12, 0.13 / -0.32, 0.13 / -0.52, 0.13 / -0.72, 0.13 / -0.92, 0.13 / -0.13, 0.13 / 0.13, 0.13 / 0.92, 0.13 / 0.72, 0.13 / 0.52, 0.13 / 0.32, 0.13 / 0.12, 0.13 / 0.91, 0.13 / 0.71, 0.13 / 0.51, 0.13 / 0.31, 0.13 / 0.11, 0.13 / 0.9, 0.13 / 0.7, 0.13 / 0.5, 0.13 / 0.3, 0.13]) },
        { name: "sandbox deep square", expression: 1.0, samples: centerAndNormalizeWave([1.0, 2.25, 1.0, -1.0, -2.25, -1.0]) },
        { name: "sandbox ring pulse", expression: 1.0, samples: centerAndNormalizeWave([1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0]) },
        { name: "sandbox double sine", expression: 1.0, samples: centerAndNormalizeWave([1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.0, -1.0, -1.1, -1.2, -1.3, -1.4, -1.5, -1.6, -1.7, -1.8, -1.9, -1.8, -1.7, -1.6, -1.5, -1.4, -1.3, -1.2, -1.1, -1.0]) },
        { name: "sandbox contrabass", expression: 0.5, samples: centerAndNormalizeWave([4.20, 6.9, 1.337, 6.66]) },
        { name: "sandbox double bass", expression: 0.4, samples: centerAndNormalizeWave([0.0, 0.1875, 0.3125, 0.5625, 0.5, 0.75, 0.875, 1.0, -1.0, -0.6875, -0.5, -0.625, -0.625, -0.5, -0.375, -0.5625, -0.4375, -0.5625, -0.4375, -0.4375, -0.3125, -0.1875, 0.1875, 0.375, 0.5625, -0.5625, 0.5625, 0.5625, 0.5625, 0.4375, 0.25, 0.0]) },
        // haileybox
        { name: "haileybox test1", expression: 0.5, samples: centerAndNormalizeWave([1.0, 0.5, -1.0]) },
        //brucebox
        { name: "brucebox pokey 4bit lfsr", expression: 0.5, samples: centerAndNormalizeWave([1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0]) },
        { name: "brucebox pokey 5step bass", expression: 0.5, samples: centerAndNormalizeWave([1.0, -1.0, 1.0, -1.0, 1.0]) },
        { name: "brucebox isolated spiky", expression: 0.5, samples: centerAndNormalizeWave([1.0, -1.0, 1.0, -1.0, 1.0, -1.0]) },
        // nerdbox
        { name: "nerdbox unnamed 1", expression: 0.5, samples: centerAndNormalizeWave([0.2, 0.8 / 0.2, 0.7, -0.4, -1.0, 0.5, -0.5 / 0.6]) },
        { name: "nerdbox unnamed 2", expression: 0.5, samples: centerAndNormalizeWave([2.0, 5.0 / 55.0, -9.0, 6.5 / 6.5, -55.0, 18.5 / -26.0]) },
        // zefbox
        { name: "zefbox semi-square", expression: 1.0, samples: centerAndNormalizeWave([1.0, 1.5, 2.0, 2.5, 2.5, 2.5, 2.0, 1.5, 1.0]) },
        { name: "zefbox deep square", expression: 1.0, samples: centerAndNormalizeWave([1.0, 2.25, 1.0, -1.0, -2.25, -1.0]) },
        { name: "zefbox squaretal", expression: 0.7, samples: centerAndNormalizeWave([1.5, 1.0, 1.5, -1.5, -1.0, -1.5]) },
        { name: "zefbox saw wide", expression: 0.65, samples: centerAndNormalizeWave([0.0, -0.4, -0.8, -1.2, -1.6, -2.0, 0.0, -0.4, -0.8, -1.2, -1.6]) },
        { name: "zefbox saw narrow", expression: 0.65, samples: centerAndNormalizeWave([1, 0.5, 1, 0.5, 1, 0.5, 1, 2, 1, 2, 1]) },
        { name: "zefbox deep sawtooth", expression: 0.5, samples: centerAndNormalizeWave([0, 2, 3, 4, 4.5, 5, 5.5, 6, 6.25, 6.5, 6.75, 7, 6.75, 6.5, 6.25, 6, 5.5, 5, 4.5, 4, 3, 2, 1]) },
        { name: "zefbox sawtal", expression: 0.3, samples: centerAndNormalizeWave([1.5, 1.0, 1.25, -0.5, 1.5, -0.5, 0.0, -1.5, 1.5, 0.0, 0.5, -1.5, 0.5, 1.25, -1.0, -1.5]) },
        { name: "zefbox deep sawtal", expression: 0.7, samples: centerAndNormalizeWave([0.75, 0.25, 0.5, -0.5, 0.5, -0.5, -0.25, -0.75]) },
        { name: "zefbox pulse", expression: 0.5, samples: centerAndNormalizeWave([1.0, -2.0, -2.0, -1.5, -1.5, -1.25, -1.25, -1.0, -1.0]) },
        { name: "zefbox triple pulse", expression: 0.4, samples: centerAndNormalizeWave([1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.5, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, 1.5]) },
        { name: "zefbox high pulse", expression: 0.2, samples: centerAndNormalizeWave([1, -2, 2, -3, 3, -4, 5, -4, 3, -3, 2, -2, 1]) },
        { name: "zefbox deep pulse", expression: 0.2, samples: centerAndNormalizeWave([1, 2, 2, -2, -2, -3, -4, -4, -5, -5, -5, -5, 0, -1, -2]) },
        // wackybox
        { name: "wackybox guitar string", expression: 0.6, samples: centerAndNormalizeWave([0, 63, 63, 63, 63, 19, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 11, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 27, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 34, 63, 63, 63, 63]) },
        { name: "wackybox intense", expression: 0.6, samples: centerAndNormalizeWave([36, 25, 33, 35, 18, 51, 22, 40, 27, 37, 31, 33, 25, 29, 41, 23, 31, 31, 45, 20, 37, 23, 29, 26, 42, 29, 33, 26, 31, 27, 40, 25, 40, 26, 37, 24, 41, 32, 0, 32, 33, 29, 32, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31]) },
        { name: "wackybox buzz wave", expression: 0.6, samples: centerAndNormalizeWave([0, 1, 1, 2, 4, 4, 4, 4, 5, 5, 6, 6, 6, 7, 8, 8, 8, 9, 9, 9, 9, 9, 9, 8, 8, 8, 11, 15, 23, 62, 61, 60, 58, 56, 56, 54, 53, 52, 50, 49, 48, 47, 47, 45, 45, 45, 44, 44, 43, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 43, 43, 53]) },
        // todbox
        { name: "todbox 1/3 pulse", expression: 0.5, samples: centerWave([1.0, -1.0, -1.0]) },
        { name: "todbox 1/5 pulse", expression: 0.5, samples: centerWave([1.0, -1.0, -1.0, -1.0, -1.0]) },
        { name: "todbox slap bass", expression: 0.5, samples: centerAndNormalizeWave([1, 0.5, 0, 0.5, 1.25, 0.5, -0.25, 0.1, -0.1, 0.1, 1.1, 2.1, 3, 3.5, 2.9, 3.3, 2.7, 2.9, 2.3, 2, 1.9, 1.8, 1, 0.7, 0.9, 0.8, 0.4, 0.1, 0.0, 0.2, 0.4, 0.6, 0.5, 0.8]) },
        { name: "todbox harsh wave", expression: 0.45, samples: centerAndNormalizeWave([1.0, -1.0, -1.0, -1.0, 0.5, 0.5, 0.5, 0.7, 0.39, 1.3, 0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0]) },
        { name: "todbox accordian", expression: 0.5, samples: centerAndNormalizeWave([0, 1, 1, 2, 2, 1.5, 1.5, 0.8, 0, -2, -3.25, -4, -4.5, -5.5, -6, -5.75, -5.5, -5, -5, -5, -6, -6, -6, -5, -4, -3, -2, -1, 0.75, 1, 2, 3, 4, 5, 6, 6.5, 7.5, 8, 7.75, 6, 5.25, 5, 5, 5, 5, 5, 4.25, 3.75, 3.25, 2.75, 1.25, -0.75, -2, -0.75, 1.25, 1.25, 2, 2, 2, 2, 1.5, -1, -2, -1, 1.5, 2, 2.75, 2.75, 2.75, 3, 2.75, -1, -2, -2.5, -2, -1, -2.25, -2.75, -2, -3, -1.75, 1, 2, 3.5, 4, 5.25, 6, 8, 9.75, 10, 9.5, 9, 8.5, 7.5, 6.5, 5.25, 5, 4.5, 4, 4, 4, 3.25, 2.5, 2, 1, -0.5, -2, -3.5, -4, -4, -4, -3.75, -3, -2, -1]) },
        // todbox beta
        { name: "todbox beta banana wave", expression: 0.8, samples: centerAndNormalizeWave([0.0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.95, 0.9, 0.85, 0.8, 0.7, 0.6, 0.5, 0.4, 0.2, 0.0]) },
        { name: "todbox beta test wave", expression: 0.5, samples: centerAndNormalizeWave([56, 0, -52, 16, 3, 3, 2, -35, 20, 147, -53, 0, 0, 5, -6]) },
        { name: "todbox beta real snare", expression: 1.0, samples: centerAndNormalizeWave([0.00000, -0.01208, -0.02997, -0.04382, -0.06042, -0.07529, -0.09116, -0.10654, -0.12189, -0.13751, -0.15289, -0.16849, -0.18387, -0.19974, -0.21484, -0.23071, -0.24557, -0.26144, -0.27731, -0.29141, -0.30350, -0.32416, -0.34406, -0.32947, -0.31158, -0.33725, -0.37579, -0.39746, -0.40201, -0.40906, -0.44180, -0.47229, -0.47379, -0.47733, -0.45239, -0.33954, -0.22894, -0.22443, -0.32138, -0.46371, -0.57178, -0.61081, -0.59998, -0.61459, -0.62189, -0.43979, -0.19217, -0.12643, -0.17252, -0.20956, -0.20981, -0.19217, -0.22845, -0.34332, -0.50629, -0.64307, -0.72922, -0.81384, -0.87857, -0.90149, -0.88687, -0.86169, -0.87781, -0.80478, -0.52493, -0.31308, -0.33249, -0.39395, -0.39017, -0.30301, -0.19949, -0.13071, -0.02493, 0.14307, 0.34961, 0.52542, 0.63223, 0.68613, 0.74710, 0.87305, 0.98184, 0.98889, 0.97052, 0.99066, 0.99747, 0.99344, 0.99469, 0.99393, 0.99570, 0.99393, 0.99521, 0.99469, 0.99420, 0.99521, 0.99420, 0.99521, 0.99469, 0.99469, 0.99521, 0.99420, 0.99545, 0.99445, 0.99469, 0.99493, 0.99420, 0.99521, 0.99393, 0.99493, 0.99469, 0.99445, 0.99570, 0.99445, 0.99521, 0.99469, 0.99469, 0.99521, 0.99420, 0.99545, 0.99445, 0.99445, 0.99493, 0.99420, 0.99545, 0.99420, 0.99493, 0.99493, 0.99420, 0.99545, 0.99445, 0.99521, 0.99469, 0.99445, 0.99545, 0.99368, 0.99393, 0.99445, 0.99268, 0.97983, 0.97229, 0.95944, 0.88486, 0.76773, 0.64481, 0.53098, 0.39847, 0.19318, -0.03827, -0.20325, -0.39319, -0.68765, -0.88461, -0.93448, -0.96069, -0.97681, -0.98715, -0.99042, -0.99142, -0.99091, -0.99142, -0.99219, -0.99091, -0.99219, -0.99066, -0.99142, -0.99142, -0.99118, -0.99191, -0.99066, -0.99191, -0.99142, -0.99142, -0.99191, -0.99091, -0.99219, -0.99118, -0.99142, -0.99167, -0.99091, -0.99219, -0.99091, -0.99167, -0.99142, -0.99091, -0.99191, -0.99091, -0.99191, -0.99142, -0.99118, -0.99191, -0.99066, -0.99191, -0.99118, -0.99142, -0.99191, -0.99066, -0.99191, -0.99091, -0.99167, -0.99191, -0.99118, -0.99219, -0.99091, -0.99191, -0.99142, -0.99142, -0.99243, -0.98865, -0.98764, -0.99219, -0.98083, -0.92517, -0.92770, -0.91486, -0.59042, -0.15189, 0.02945, 0.05667, 0.06195, 0.00629, -0.18008, -0.56497, -0.88010, -0.92770, -0.92871, -0.97705, -0.99167, -0.98663, -0.99118, -0.99042, -0.99219, -0.99142, -0.99118, -0.98941, -0.99219, -1.00000, -0.97580, -0.95993, -0.99948, -0.98236, -0.84659, -0.74860, -0.70679, -0.59747, -0.48035, -0.41687, -0.36826, -0.29745, -0.18185, -0.06219, 0.02164, 0.07907, 0.13123, 0.18033, 0.19620, 0.15692, 0.14053, 0.20251, 0.27530, 0.30905, 0.29092, 0.27252, 0.30402, 0.32416, 0.32214, 0.35239, 0.39670, 0.43198, 0.49420, 0.58487, 0.64154, 0.65967, 0.67050, 0.67026, 0.66522, 0.65540, 0.66119, 0.70627, 0.75842, 0.78738, 0.78940, 0.78763, 0.80402, 0.85944, 0.94559, 0.98990, 0.98160, 0.98007, 0.99368, 0.99393, 0.98538, 0.97580, 0.97101, 0.93802, 0.81812, 0.64633, 0.46649, 0.28613, 0.14685, 0.08966, 0.12543, 0.20325, 0.24557, 0.18866, 0.02795, -0.20175, -0.44205, -0.58713, -0.57629, -0.41385, -0.14255, 0.18033, 0.47882, 0.68311, 0.72314, 0.62064, 0.48309, 0.43073, 0.53577, 0.72794, 0.90250, 0.97354, 0.97000, 0.98083, 0.99191, 0.99319, 0.99493, 0.99393, 0.99521, 0.99393, 0.99545, 0.99420, 0.99493, 0.99493, 0.99445, 0.99545, 0.99420, 0.99545, 0.99243, 0.98917, 0.98386, 0.97781, 0.95844, 0.89066, 0.81561, 0.78134, 0.77277, 0.75995, 0.73022, 0.67126, 0.57178, 0.47000, 0.38361, 0.29419, 0.20703, 0.14734, 0.15866, 0.25162, 0.35818, 0.45062, 0.56750, 0.69748, 0.81232, 0.89697, 0.95062, 0.97656, 0.98615, 0.99191, 0.99219, 0.99243, 0.99368, 0.99368, 0.97028, 0.95566, 0.94559, 0.82617, 0.59973, 0.38361, 0.23901, 0.15338, 0.12921, 0.11206, 0.04382, -0.12946, -0.43552, -0.72644, -0.89847, -0.95465, -0.95541, -0.97229, -0.99268, -0.99319, -0.98840, -0.99142, -0.99167, -0.99091, -0.98840, -0.98965, -0.99368, -0.97455, -0.95010, -0.94684, -0.96219, -0.98514, -0.99243, -0.98889, -0.98917, -0.99142, -0.99219, -0.99091, -0.99191, -0.99142, -0.99142, -0.99191, -0.99066, -0.99167, -0.99091, -0.99142, -0.99191, -0.99091, -0.99191, -0.99091, -0.99167, -0.99167, -0.99091, -0.99219, -0.99091, -0.99191, -0.99142, -0.99118, -0.99191, -0.99066, -0.99191, -0.99091, -0.99118, -0.99243, -0.98941, -0.98462, -0.96976, -0.96320, -0.96194, -0.87305, -0.66196, -0.44809, -0.29495, -0.18085, -0.11813, -0.11334, -0.18564, -0.34885, -0.58237, -0.80450, -0.93726, -0.97806, -0.97354, -0.97531, -0.98990, -0.99368, -0.98941, -0.99219, -0.99091, -0.99142, -0.99167, -0.99091, -0.99191, -0.99118, -0.99219, -0.98236, -0.97781, -0.97656, -0.95135, -0.87204, -0.71335, -0.52139, -0.34232, -0.17783, -0.00906, 0.14886, 0.30450, 0.48889, 0.67404, 0.84030, 0.94128, 0.97681, 0.98462, 0.98337, 0.99142, 0.99521, 0.99493, 0.99420, 0.99445, 0.99521, 0.99393, 0.99545, 0.99445, 0.99521, 0.99521, 0.99445, 0.99570, 0.99445, 0.99521, 0.99469, 0.99445, 0.99521, 0.99420, 0.99521, 0.99445, 0.99445, 0.99521, 0.99445, 0.99545, 0.99445, 0.99469, 0.99493, 0.99393, 0.99493, 0.99445, 0.99393, 0.98285, 0.97781, 0.97479, 0.92844, 0.82114, 0.66095, 0.52417, 0.46826, 0.46722, 0.47934, 0.47379, 0.47076, 0.48209, 0.42014, 0.25439, 0.10074, -0.00302, -0.08966, -0.16068, -0.21436, -0.22040, -0.15137, -0.00476, 0.18536, 0.37631, 0.52292, 0.62164, 0.70425, 0.74835, 0.72366, 0.63928, 0.52567, 0.40805, 0.35666, 0.42896, 0.60175, 0.80200, 0.92743, 0.96548, 0.97632, 0.98337, 0.99066, 0.99521, 0.99420, 0.99368, 0.99292, 0.98840, 0.98083, 0.96774, 0.93323, 0.85440, 0.69470, 0.47202, 0.20425, -0.08890, -0.36423, -0.60025, -0.77481, -0.90173, -0.96017, -0.97028, -0.98108, -0.98840, -0.99219, -0.98990, -0.99219, -0.99142, -0.99142, -0.99219, -0.99091, -0.99243, -0.99066, -0.99142, -0.99142, -0.99118, -0.99191, -0.99066, -0.99167, -0.99142, -0.99142, -0.99219, -0.99091, -0.99191, -0.99118, -0.99142, -0.99191, -0.99091, -0.99191, -0.99091, -0.99167, -0.99191, -0.99118, -0.99219, -0.99091, -0.99167, -0.99142, -0.99142, -0.99219, -0.99091, -0.99191, -0.99142, -0.99118, -0.98917, -0.99042, -0.99445, -0.97330, -0.95590, -0.96219, -0.89670, -0.72241, -0.55112, -0.44809, -0.39319, -0.37833, -0.35641, -0.26270, -0.14230, -0.11282, -0.13525, -0.11536, -0.09671, -0.11511, -0.18060, -0.26874, -0.33374, -0.42215, -0.51358, -0.44785, -0.30450, -0.28613, -0.30527, -0.25037, -0.15390, -0.08286, -0.11157, -0.12592, -0.00327, 0.13803, 0.19141, 0.12820, 0.01788, -0.03952, -0.12592, -0.26773, -0.34634, -0.31384, -0.18060, -0.01080, 0.13574, 0.26120, 0.36975, 0.46573, 0.55087, 0.63626, 0.73022, 0.83072, 0.92014, 0.97177, 0.98587, 0.98413, 0.99167, 0.99445, 0.99292, 0.99219, 0.98740, 0.98007, 0.96472, 0.92239, 0.82166, 0.69067, 0.57959, 0.54962, 0.59695, 0.64255, 0.64633, 0.60629, 0.55942, 0.54910, 0.58966, 0.61887, 0.56952, 0.54181, 0.59518, 0.63248, 0.63876, 0.65463, 0.73398, 0.88312, 0.96927, 0.97101, 0.97958, 0.99344, 0.99420, 0.99268, 0.99493, 0.99469, 0.99445, 0.99521, 0.99445, 0.99545, 0.99420, 0.99493, 0.99493, 0.99420, 0.99545, 0.99420, 0.99493, 0.99420, 0.99393, 0.99420, 0.98840, 0.98309, 0.98309, 0.96069, 0.88461, 0.79370, 0.72064, 0.65765, 0.59998, 0.53247, 0.49268, 0.48615, 0.44205, 0.38034, 0.36447, 0.38715, 0.39294, 0.32645, 0.19595, 0.07782, -0.05893, -0.27832, -0.48309, -0.62619, -0.72995, -0.79999, -0.84583, -0.82166, -0.73575, -0.67227, -0.65491, -0.64960, -0.66397, -0.70175, -0.72894, -0.74658, -0.76724, -0.79520, -0.82846, -0.86523, -0.90527, -0.94382, -0.89948, -0.69849, -0.47479, -0.31662, -0.15414, -0.00729, 0.07077, 0.08237, 0.04431, -0.02292, -0.11761, -0.24307, -0.36926, -0.45087, -0.46170, -0.40250, -0.30679, -0.17529, 0.00000, 0.14331, 0.24179, 0.36774, 0.49545, 0.56522, 0.57907, 0.56775, 0.53851, 0.51132, 0.48688, 0.41913, 0.26044, 0.00955, -0.26297, -0.46396, -0.62341, -0.82214, -0.94684, -0.96774, -0.97531, -0.98413, -0.99017, -0.98990, -0.99219, -0.99066, -0.99142, -0.99167, -0.99118, -0.99219, -0.98990, -0.99118, -0.99368, -0.99142, -0.97757, -0.97403, -0.98007, -0.96170, -0.86826, -0.67783, -0.52719, -0.48788, -0.45490, -0.43146, -0.47681, -0.54105, -0.57983, -0.60904, -0.62317, -0.59949, -0.55566, -0.52063, -0.52115, -0.55112, -0.56244, -0.58337, -0.65540, -0.73373, -0.77228, -0.74759, -0.68890, -0.64609, -0.61887, -0.58060, -0.50351, -0.40729, -0.33929, -0.35110, -0.42944, -0.47028, -0.42267, -0.32718, -0.20224, -0.05640, 0.04556, 0.10529, 0.17630, 0.26169, 0.33197, 0.32138, 0.23776, 0.20956, 0.23148, 0.20352, 0.23325, 0.39267, 0.52719, 0.58438, 0.62289, 0.66345, 0.70023, 0.66296, 0.54330, 0.42618, 0.33475, 0.24533, 0.14105, 0.03851, 0.01358, 0.09143, 0.22845, 0.34961, 0.41711, 0.48740, 0.58914, 0.69519, 0.78186, 0.84357, 0.89822, 0.95389, 0.98135, 0.98615, 0.99167, 0.99243, 0.99445, 0.99420, 0.99469, 0.99493, 0.99393, 0.99545, 0.99445, 0.99521, 0.99469, 0.99445, 0.99521, 0.99420, 0.99469, 0.98965, 0.98715, 0.98563, 0.96295, 0.91736, 0.86624, 0.82367, 0.77554, 0.68411, 0.53549, 0.38916, 0.26120, 0.11435, -0.04053, -0.18161, -0.23172, -0.19394, -0.15237, -0.10730, -0.02997, 0.08588, 0.22620, 0.34305, 0.44104, 0.55740, 0.65765, 0.71259, 0.69217, 0.65363, 0.69748, 0.79572, 0.89368, 0.95514, 0.97733, 0.98413, 0.98816, 0.99243, 0.99445, 0.99243, 0.97302, 0.96674, 0.97983, 0.90378, 0.71005, 0.51056, 0.40451, 0.40982, 0.41559, 0.32996, 0.24356, 0.18866, 0.11411, 0.05365, 0.01157, -0.03247, -0.09216, -0.16095, -0.23248, -0.31662, -0.39771, -0.48663, -0.59647, -0.71536, -0.82013, -0.85287, -0.82947, -0.84937, -0.92215, -0.97177, -0.98663, -0.98816, -0.98438, -0.99091, -0.99219, -0.99091, -0.99191, -0.99042, -0.99191, -0.99091, -0.99142, -0.99191, -0.99091, -0.99191, -0.99091, -0.99167, -0.99142]) },
        // based off an old mp3 in #modded-beepbox where someone tried to shorten the overdrive guitar into the size of other chip waves
        // search "normie alert" in beepcord
        { name: "ultrabox shortened od guitar", expression: 0.5, samples: centerAndNormalizeWave([-0.82785, -0.67621, -0.40268, -0.43817, -0.45468, -0.22531, -0.18329, 0.24750, 0.71246, 0.52155, 0.56082, 0.48395, 0.33990, 0.46957, 0.27744, 0.42313, 0.47104, 0.18796, 0.12930, -0.13901, -0.07431, -0.16348, -0.74857, -0.73206, -0.35181, -0.26227, -0.41882, -0.27786, -0.19806, -0.19867, 0.18643, 0.24808, 0.08847, -0.06964, 0.06912, 0.20474, -0.05304, 0.29416, 0.31967, 0.14243, 0.27521, -0.23932, -0.14752, 0.12360, -0.26123, -0.26111, 0.06616, 0.26520, 0.08090, 0.15240, 0.16254, -0.12061, 0.04562, 0.00131, 0.04050, 0.08182, -0.21729, -0.17041, -0.16312, -0.08563, 0.06390, 0.05099, 0.05627, 0.02728, 0.00726, -0.13028, -0.05673, -0.14969, -0.17645, 0.35492, 0.16766, -0.00897, 0.24326, -0.00461, -0.04456, 0.01776, -0.04950, -0.01221, 0.02039, 0.07684, 0.13397, 0.39850, 0.35962, 0.13754, 0.42310, 0.27161, -0.17609, 0.03659, 0.10635, -0.21909, -0.22046, -0.20258, -0.40973, -0.40280, -0.40521, -0.66284]) },
        // 4k cause 4000 points. not 4096, just 4000
        //{ name: "4k rounded", expression: 0.94, samples: centerWave([]) },
        //{ name: "4k triangle", expression: 1.0, samples: centerWave([]) },
        { name: "4k sawtooth", expression: 0.65, samples: centerWave([0.0005,0.001,0.0015,0.002,0.0025,0.003,0.0035,0.004,0.0045,0.005,0.0055,0.006,0.0065,0.007,0.0075,0.008,0.0085,0.009,0.0095,0.01,0.0105,0.011,0.0115,0.012,0.0125,0.013,0.0135,0.014,0.0145,0.015,0.0155,0.016,0.0165,0.017,0.0175,0.018,0.0185,0.019,0.0195,0.02,0.0205,0.021,0.0215,0.022,0.0225,0.023,0.0235,0.024,0.0245,0.025,0.0255,0.026,0.0265,0.027,0.0275,0.028,0.0285,0.029,0.0295,0.03,0.0305,0.031,0.0315,0.032,0.0325,0.033,0.0335,0.034,0.0345,0.035,0.0355,0.036,0.0365,0.037,0.0375,0.038,0.0385,0.039,0.0395,0.04,0.0405,0.041,0.0415,0.042,0.0425,0.043,0.0435,0.044,0.0445,0.045,0.0455,0.046,0.0465,0.047,0.0475,0.048,0.0485,0.049,0.0495,0.05,0.0505,0.051,0.0515,0.052,0.0525,0.053,0.0535,0.054,0.0545,0.055,0.0555,0.056,0.0565,0.057,0.0575,0.058,0.0585,0.059,0.0595,0.06,0.0605,0.061,0.0615,0.062,0.0625,0.063,0.0635,0.064,0.0645,0.065,0.0655,0.066,0.0665,0.067,0.0675,0.068,0.0685,0.069,0.0695,0.07,0.0705,0.071,0.0715,0.072,0.0725,0.073,0.0735,0.074,0.0745,0.075,0.0755,0.076,0.0765,0.077,0.0775,0.078,0.0785,0.079,0.0795,0.08,0.0805,0.081,0.0815,0.082,0.0825,0.083,0.0835,0.084,0.0845,0.085,0.0855,0.086,0.0865,0.087,0.0875,0.088,0.0885,0.089,0.0895,0.09,0.0905,0.091,0.0915,0.092,0.0925,0.093,0.0935,0.094,0.0945,0.095,0.0955,0.096,0.0965,0.097,0.0975,0.098,0.0985,0.099,0.0995,0.1,0.1005,0.101,0.1015,0.102,0.1025,0.103,0.1035,0.104,0.1045,0.105,0.1055,0.106,0.1065,0.107,0.1075,0.108,0.1085,0.109,0.1095,0.11,0.1105,0.111,0.1115,0.112,0.1125,0.113,0.1135,0.114,0.1145,0.115,0.1155,0.116,0.1165,0.117,0.1175,0.118,0.1185,0.119,0.1195,0.12,0.1205,0.121,0.1215,0.122,0.1225,0.123,0.1235,0.124,0.1245,0.125,0.1255,0.126,0.1265,0.127,0.1275,0.128,0.1285,0.129,0.1295,0.13,0.1305,0.131,0.1315,0.132,0.1325,0.133,0.1335,0.134,0.1345,0.135,0.1355,0.136,0.1365,0.137,0.1375,0.138,0.1385,0.139,0.1395,0.14,0.1405,0.141,0.1415,0.142,0.1425,0.143,0.1435,0.144,0.1445,0.145,0.1455,0.146,0.1465,0.147,0.1475,0.148,0.1485,0.149,0.1495,0.15,0.1505,0.151,0.1515,0.152,0.1525,0.153,0.1535,0.154,0.1545,0.155,0.1555,0.156,0.1565,0.157,0.1575,0.158,0.1585,0.159,0.1595,0.16,0.1605,0.161,0.1615,0.162,0.1625,0.163,0.1635,0.164,0.1645,0.165,0.1655,0.166,0.1665,0.167,0.1675,0.168,0.1685,0.169,0.1695,0.17,0.1705,0.171,0.1715,0.172,0.1725,0.173,0.1735,0.174,0.1745,0.175,0.1755,0.176,0.1765,0.177,0.1775,0.178,0.1785,0.179,0.1795,0.18,0.1805,0.181,0.1815,0.182,0.1825,0.183,0.1835,0.184,0.1845,0.185,0.1855,0.186,0.1865,0.187,0.1875,0.188,0.1885,0.189,0.1895,0.19,0.1905,0.191,0.1915,0.192,0.1925,0.193,0.1935,0.194,0.1945,0.195,0.1955,0.196,0.1965,0.197,0.1975,0.198,0.1985,0.199,0.1995,0.2,0.2005,0.201,0.2015,0.202,0.2025,0.203,0.2035,0.204,0.2045,0.205,0.2055,0.206,0.2065,0.207,0.2075,0.208,0.2085,0.209,0.2095,0.21,0.2105,0.211,0.2115,0.212,0.2125,0.213,0.2135,0.214,0.2145,0.215,0.2155,0.216,0.2165,0.217,0.2175,0.218,0.2185,0.219,0.2195,0.22,0.2205,0.221,0.2215,0.222,0.2225,0.223,0.2235,0.224,0.2245,0.225,0.2255,0.226,0.2265,0.227,0.2275,0.228,0.2285,0.229,0.2295,0.23,0.2305,0.231,0.2315,0.232,0.2325,0.233,0.2335,0.234,0.2345,0.235,0.2355,0.236,0.2365,0.237,0.2375,0.238,0.2385,0.239,0.2395,0.24,0.2405,0.241,0.2415,0.242,0.2425,0.243,0.2435,0.244,0.2445,0.245,0.2455,0.246,0.2465,0.247,0.2475,0.248,0.2485,0.249,0.2495,0.25,0.2505,0.251,0.2515,0.252,0.2525,0.253,0.2535,0.254,0.2545,0.255,0.2555,0.256,0.2565,0.257,0.2575,0.258,0.2585,0.259,0.2595,0.26,0.2605,0.261,0.2615,0.262,0.2625,0.263,0.2635,0.264,0.2645,0.265,0.2655,0.266,0.2665,0.267,0.2675,0.268,0.2685,0.269,0.2695,0.27,0.2705,0.271,0.2715,0.272,0.2725,0.273,0.2735,0.274,0.2745,0.275,0.2755,0.276,0.2765,0.277,0.2775,0.278,0.2785,0.279,0.2795,0.28,0.2805,0.281,0.2815,0.282,0.2825,0.283,0.2835,0.284,0.2845,0.285,0.2855,0.286,0.2865,0.287,0.2875,0.288,0.2885,0.289,0.2895,0.29,0.2905,0.291,0.2915,0.292,0.2925,0.293,0.2935,0.294,0.2945,0.295,0.2955,0.296,0.2965,0.297,0.2975,0.298,0.2985,0.299,0.2995,0.3,0.3005,0.301,0.3015,0.302,0.3025,0.303,0.3035,0.304,0.3045,0.305,0.3055,0.306,0.3065,0.307,0.3075,0.308,0.3085,0.309,0.3095,0.31,0.3105,0.311,0.3115,0.312,0.3125,0.313,0.3135,0.314,0.3145,0.315,0.3155,0.316,0.3165,0.317,0.3175,0.318,0.3185,0.319,0.3195,0.32,0.3205,0.321,0.3215,0.322,0.3225,0.323,0.3235,0.324,0.3245,0.325,0.3255,0.326,0.3265,0.327,0.3275,0.328,0.3285,0.329,0.3295,0.33,0.3305,0.331,0.3315,0.332,0.3325,0.333,0.3335,0.334,0.3345,0.335,0.3355,0.336,0.3365,0.337,0.3375,0.338,0.3385,0.339,0.3395,0.34,0.3405,0.341,0.3415,0.342,0.3425,0.343,0.3435,0.344,0.3445,0.345,0.3455,0.346,0.3465,0.347,0.3475,0.348,0.3485,0.349,0.3495,0.35,0.3505,0.351,0.3515,0.352,0.3525,0.353,0.3535,0.354,0.3545,0.355,0.3555,0.356,0.3565,0.357,0.3575,0.358,0.3585,0.359,0.3595,0.36,0.3605,0.361,0.3615,0.362,0.3625,0.363,0.3635,0.364,0.3645,0.365,0.3655,0.366,0.3665,0.367,0.3675,0.368,0.3685,0.369,0.3695,0.37,0.3705,0.371,0.3715,0.372,0.3725,0.373,0.3735,0.374,0.3745,0.375,0.3755,0.376,0.3765,0.377,0.3775,0.378,0.3785,0.379,0.3795,0.38,0.3805,0.381,0.3815,0.382,0.3825,0.383,0.3835,0.384,0.3845,0.385,0.3855,0.386,0.3865,0.387,0.3875,0.388,0.3885,0.389,0.3895,0.39,0.3905,0.391,0.3915,0.392,0.3925,0.393,0.3935,0.394,0.3945,0.395,0.3955,0.396,0.3965,0.397,0.3975,0.398,0.3985,0.399,0.3995,0.4,0.4005,0.401,0.4015,0.402,0.4025,0.403,0.4035,0.404,0.4045,0.405,0.4055,0.406,0.4065,0.407,0.4075,0.408,0.4085,0.409,0.4095,0.41,0.4105,0.411,0.4115,0.412,0.4125,0.413,0.4135,0.414,0.4145,0.415,0.4155,0.416,0.4165,0.417,0.4175,0.418,0.4185,0.419,0.4195,0.42,0.4205,0.421,0.4215,0.422,0.4225,0.423,0.4235,0.424,0.4245,0.425,0.4255,0.426,0.4265,0.427,0.4275,0.428,0.4285,0.429,0.4295,0.43,0.4305,0.431,0.4315,0.432,0.4325,0.433,0.4335,0.434,0.4345,0.435,0.4355,0.436,0.4365,0.437,0.4375,0.438,0.4385,0.439,0.4395,0.44,0.4405,0.441,0.4415,0.442,0.4425,0.443,0.4435,0.444,0.4445,0.445,0.4455,0.446,0.4465,0.447,0.4475,0.448,0.4485,0.449,0.4495,0.45,0.4505,0.451,0.4515,0.452,0.4525,0.453,0.4535,0.454,0.4545,0.455,0.4555,0.456,0.4565,0.457,0.4575,0.458,0.4585,0.459,0.4595,0.46,0.4605,0.461,0.4615,0.462,0.4625,0.463,0.4635,0.464,0.4645,0.465,0.4655,0.466,0.4665,0.467,0.4675,0.468,0.4685,0.469,0.4695,0.47,0.4705,0.471,0.4715,0.472,0.4725,0.473,0.4735,0.474,0.4745,0.475,0.4755,0.476,0.4765,0.477,0.4775,0.478,0.4785,0.479,0.4795,0.48,0.4805,0.481,0.4815,0.482,0.4825,0.483,0.4835,0.484,0.4845,0.485,0.4855,0.486,0.4865,0.487,0.4875,0.488,0.4885,0.489,0.4895,0.49,0.4905,0.491,0.4915,0.492,0.4925,0.493,0.4935,0.494,0.4945,0.495,0.4955,0.496,0.4965,0.497,0.4975,0.498,0.4985,0.499,0.4995,0.5,0.5005,0.501,0.5015,0.502,0.5025,0.503,0.5035,0.504,0.5045,0.505,0.5055,0.506,0.5065,0.507,0.5075,0.508,0.5085,0.509,0.5095,0.51,0.5105,0.511,0.5115,0.512,0.5125,0.513,0.5135,0.514,0.5145,0.515,0.5155,0.516,0.5165,0.517,0.5175,0.518,0.5185,0.519,0.5195,0.52,0.5205,0.521,0.5215,0.522,0.5225,0.523,0.5235,0.524,0.5245,0.525,0.5255,0.526,0.5265,0.527,0.5275,0.528,0.5285,0.529,0.5295,0.53,0.5305,0.531,0.5315,0.532,0.5325,0.533,0.5335,0.534,0.5345,0.535,0.5355,0.536,0.5365,0.537,0.5375,0.538,0.5385,0.539,0.5395,0.54,0.5405,0.541,0.5415,0.542,0.5425,0.543,0.5435,0.544,0.5445,0.545,0.5455,0.546,0.5465,0.547,0.5475,0.548,0.5485,0.549,0.5495,0.55,0.5505,0.551,0.5515,0.552,0.5525,0.553,0.5535,0.554,0.5545,0.555,0.5555,0.556,0.5565,0.557,0.5575,0.558,0.5585,0.559,0.5595,0.56,0.5605,0.561,0.5615,0.562,0.5625,0.563,0.5635,0.564,0.5645,0.565,0.5655,0.566,0.5665,0.567,0.5675,0.568,0.5685,0.569,0.5695,0.57,0.5705,0.571,0.5715,0.572,0.5725,0.573,0.5735,0.574,0.5745,0.575,0.5755,0.576,0.5765,0.577,0.5775,0.578,0.5785,0.579,0.5795,0.58,0.5805,0.581,0.5815,0.582,0.5825,0.583,0.5835,0.584,0.5845,0.585,0.5855,0.586,0.5865,0.587,0.5875,0.588,0.5885,0.589,0.5895,0.59,0.5905,0.591,0.5915,0.592,0.5925,0.593,0.5935,0.594,0.5945,0.595,0.5955,0.596,0.5965,0.597,0.5975,0.598,0.5985,0.599,0.5995,0.6,0.6005,0.601,0.6015,0.602,0.6025,0.603,0.6035,0.604,0.6045,0.605,0.6055,0.606,0.6065,0.607,0.6075,0.608,0.6085,0.609,0.6095,0.61,0.6105,0.611,0.6115,0.612,0.6125,0.613,0.6135,0.614,0.6145,0.615,0.6155,0.616,0.6165,0.617,0.6175,0.618,0.6185,0.619,0.6195,0.62,0.6205,0.621,0.6215,0.622,0.6225,0.623,0.6235,0.624,0.6245,0.625,0.6255,0.626,0.6265,0.627,0.6275,0.628,0.6285,0.629,0.6295,0.63,0.6305,0.631,0.6315,0.632,0.6325,0.633,0.6335,0.634,0.6345,0.635,0.6355,0.636,0.6365,0.637,0.6375,0.638,0.6385,0.639,0.6395,0.64,0.6405,0.641,0.6415,0.642,0.6425,0.643,0.6435,0.644,0.6445,0.645,0.6455,0.646,0.6465,0.647,0.6475,0.648,0.6485,0.649,0.6495,0.65,0.6505,0.651,0.6515,0.652,0.6525,0.653,0.6535,0.654,0.6545,0.655,0.6555,0.656,0.6565,0.657,0.6575,0.658,0.6585,0.659,0.6595,0.66,0.6605,0.661,0.6615,0.662,0.6625,0.663,0.6635,0.664,0.6645,0.665,0.6655,0.666,0.6665,0.667,0.6675,0.668,0.6685,0.669,0.6695,0.67,0.6705,0.671,0.6715,0.672,0.6725,0.673,0.6735,0.674,0.6745,0.675,0.6755,0.676,0.6765,0.677,0.6775,0.678,0.6785,0.679,0.6795,0.68,0.6805,0.681,0.6815,0.682,0.6825,0.683,0.6835,0.684,0.6845,0.685,0.6855,0.686,0.6865,0.687,0.6875,0.688,0.6885,0.689,0.6895,0.69,0.6905,0.691,0.6915,0.692,0.6925,0.693,0.6935,0.694,0.6945,0.695,0.6955,0.696,0.6965,0.697,0.6975,0.698,0.6985,0.699,0.6995,0.7,0.7005,0.701,0.7015,0.702,0.7025,0.703,0.7035,0.704,0.7045,0.705,0.7055,0.706,0.7065,0.707,0.7075,0.708,0.7085,0.709,0.7095,0.71,0.7105,0.711,0.7115,0.712,0.7125,0.713,0.7135,0.714,0.7145,0.715,0.7155,0.716,0.7165,0.717,0.7175,0.718,0.7185,0.719,0.7195,0.72,0.7205,0.721,0.7215,0.722,0.7225,0.723,0.7235,0.724,0.7245,0.725,0.7255,0.726,0.7265,0.727,0.7275,0.728,0.7285,0.729,0.7295,0.73,0.7305,0.731,0.7315,0.732,0.7325,0.733,0.7335,0.734,0.7345,0.735,0.7355,0.736,0.7365,0.737,0.7375,0.738,0.7385,0.739,0.7395,0.74,0.7405,0.741,0.7415,0.742,0.7425,0.743,0.7435,0.744,0.7445,0.745,0.7455,0.746,0.7465,0.747,0.7475,0.748,0.7485,0.749,0.7495,0.75,0.7505,0.751,0.7515,0.752,0.7525,0.753,0.7535,0.754,0.7545,0.755,0.7555,0.756,0.7565,0.757,0.7575,0.758,0.7585,0.759,0.7595,0.76,0.7605,0.761,0.7615,0.762,0.7625,0.763,0.7635,0.764,0.7645,0.765,0.7655,0.766,0.7665,0.767,0.7675,0.768,0.7685,0.769,0.7695,0.77,0.7705,0.771,0.7715,0.772,0.7725,0.773,0.7735,0.774,0.7745,0.775,0.7755,0.776,0.7765,0.777,0.7775,0.778,0.7785,0.779,0.7795,0.78,0.7805,0.781,0.7815,0.782,0.7825,0.783,0.7835,0.784,0.7845,0.785,0.7855,0.786,0.7865,0.787,0.7875,0.788,0.7885,0.789,0.7895,0.79,0.7905,0.791,0.7915,0.792,0.7925,0.793,0.7935,0.794,0.7945,0.795,0.7955,0.796,0.7965,0.797,0.7975,0.798,0.7985,0.799,0.7995,0.8,0.8005,0.801,0.8015,0.802,0.8025,0.803,0.8035,0.804,0.8045,0.805,0.8055,0.806,0.8065,0.807,0.8075,0.808,0.8085,0.809,0.8095,0.81,0.8105,0.811,0.8115,0.812,0.8125,0.813,0.8135,0.814,0.8145,0.815,0.8155,0.816,0.8165,0.817,0.8175,0.818,0.8185,0.819,0.8195,0.82,0.8205,0.821,0.8215,0.822,0.8225,0.823,0.8235,0.824,0.8245,0.825,0.8255,0.826,0.8265,0.827,0.8275,0.828,0.8285,0.829,0.8295,0.83,0.8305,0.831,0.8315,0.832,0.8325,0.833,0.8335,0.834,0.8345,0.835,0.8355,0.836,0.8365,0.837,0.8375,0.838,0.8385,0.839,0.8395,0.84,0.8405,0.841,0.8415,0.842,0.8425,0.843,0.8435,0.844,0.8445,0.845,0.8455,0.846,0.8465,0.847,0.8475,0.848,0.8485,0.849,0.8495,0.85,0.8505,0.851,0.8515,0.852,0.8525,0.853,0.8535,0.854,0.8545,0.855,0.8555,0.856,0.8565,0.857,0.8575,0.858,0.8585,0.859,0.8595,0.86,0.8605,0.861,0.8615,0.862,0.8625,0.863,0.8635,0.864,0.8645,0.865,0.8655,0.866,0.8665,0.867,0.8675,0.868,0.8685,0.869,0.8695,0.87,0.8705,0.871,0.8715,0.872,0.8725,0.873,0.8735,0.874,0.8745,0.875,0.8755,0.876,0.8765,0.877,0.8775,0.878,0.8785,0.879,0.8795,0.88,0.8805,0.881,0.8815,0.882,0.8825,0.883,0.8835,0.884,0.8845,0.885,0.8855,0.886,0.8865,0.887,0.8875,0.888,0.8885,0.889,0.8895,0.89,0.8905,0.891,0.8915,0.892,0.8925,0.893,0.8935,0.894,0.8945,0.895,0.8955,0.896,0.8965,0.897,0.8975,0.898,0.8985,0.899,0.8995,0.9,0.9005,0.901,0.9015,0.902,0.9025,0.903,0.9035,0.904,0.9045,0.905,0.9055,0.906,0.9065,0.907,0.9075,0.908,0.9085,0.909,0.9095,0.91,0.9105,0.911,0.9115,0.912,0.9125,0.913,0.9135,0.914,0.9145,0.915,0.9155,0.916,0.9165,0.917,0.9175,0.918,0.9185,0.919,0.9195,0.92,0.9205,0.921,0.9215,0.922,0.9225,0.923,0.9235,0.924,0.9245,0.925,0.9255,0.926,0.9265,0.927,0.9275,0.928,0.9285,0.929,0.9295,0.93,0.9305,0.931,0.9315,0.932,0.9325,0.933,0.9335,0.934,0.9345,0.935,0.9355,0.936,0.9365,0.937,0.9375,0.938,0.9385,0.939,0.9395,0.94,0.9405,0.941,0.9415,0.942,0.9425,0.943,0.9435,0.944,0.9445,0.945,0.9455,0.946,0.9465,0.947,0.9475,0.948,0.9485,0.949,0.9495,0.95,0.9505,0.951,0.9515,0.952,0.9525,0.953,0.9535,0.954,0.9545,0.955,0.9555,0.956,0.9565,0.957,0.9575,0.958,0.9585,0.959,0.9595,0.96,0.9605,0.961,0.9615,0.962,0.9625,0.963,0.9635,0.964,0.9645,0.965,0.9655,0.966,0.9665,0.967,0.9675,0.968,0.9685,0.969,0.9695,0.97,0.9705,0.971,0.9715,0.972,0.9725,0.973,0.9735,0.974,0.9745,0.975,0.9755,0.976,0.9765,0.977,0.9775,0.978,0.9785,0.979,0.9795,0.98,0.9805,0.981,0.9815,0.982,0.9825,0.983,0.9835,0.984,0.9845,0.985,0.9855,0.986,0.9865,0.987,0.9875,0.988,0.9885,0.989,0.9895,0.99,0.9905,0.991,0.9915,0.992,0.9925,0.993,0.9935,0.994,0.9945,0.995,0.9955,0.996,0.9965,0.997,0.9975,0.998,0.9985,0.999,0.9995,-1,-0.9995,-0.999,-0.9985,-0.998,-0.9975,-0.997,-0.9965,-0.996,-0.9955,-0.995,-0.9945,-0.994,-0.9935,-0.993,-0.9925,-0.992,-0.9915,-0.991,-0.9905,-0.99,-0.9895,-0.989,-0.9885,-0.988,-0.9875,-0.987,-0.9865,-0.986,-0.9855,-0.985,-0.9845,-0.984,-0.9835,-0.983,-0.9825,-0.982,-0.9815,-0.981,-0.9805,-0.98,-0.9795,-0.979,-0.9785,-0.978,-0.9775,-0.977,-0.9765,-0.976,-0.9755,-0.975,-0.9745,-0.974,-0.9735,-0.973,-0.9725,-0.972,-0.9715,-0.971,-0.9705,-0.97,-0.9695,-0.969,-0.9685,-0.968,-0.9675,-0.967,-0.9665,-0.966,-0.9655,-0.965,-0.9645,-0.964,-0.9635,-0.963,-0.9625,-0.962,-0.9615,-0.961,-0.9605,-0.96,-0.9595,-0.959,-0.9585,-0.958,-0.9575,-0.957,-0.9565,-0.956,-0.9555,-0.955,-0.9545,-0.954,-0.9535,-0.953,-0.9525,-0.952,-0.9515,-0.951,-0.9505,-0.95,-0.9495,-0.949,-0.9485,-0.948,-0.9475,-0.947,-0.9465,-0.946,-0.9455,-0.945,-0.9445,-0.944,-0.9435,-0.943,-0.9425,-0.942,-0.9415,-0.941,-0.9405,-0.94,-0.9395,-0.939,-0.9385,-0.938,-0.9375,-0.937,-0.9365,-0.936,-0.9355,-0.935,-0.9345,-0.934,-0.9335,-0.933,-0.9325,-0.932,-0.9315,-0.931,-0.9305,-0.93,-0.9295,-0.929,-0.9285,-0.928,-0.9275,-0.927,-0.9265,-0.926,-0.9255,-0.925,-0.9245,-0.924,-0.9235,-0.923,-0.9225,-0.922,-0.9215,-0.921,-0.9205,-0.92,-0.9195,-0.919,-0.9185,-0.918,-0.9175,-0.917,-0.9165,-0.916,-0.9155,-0.915,-0.9145,-0.914,-0.9135,-0.913,-0.9125,-0.912,-0.9115,-0.911,-0.9105,-0.91,-0.9095,-0.909,-0.9085,-0.908,-0.9075,-0.907,-0.9065,-0.906,-0.9055,-0.905,-0.9045,-0.904,-0.9035,-0.903,-0.9025,-0.902,-0.9015,-0.901,-0.9005,-0.9,-0.8995,-0.899,-0.8985,-0.898,-0.8975,-0.897,-0.8965,-0.896,-0.8955,-0.895,-0.8945,-0.894,-0.8935,-0.893,-0.8925,-0.892,-0.8915,-0.891,-0.8905,-0.89,-0.8895,-0.889,-0.8885,-0.888,-0.8875,-0.887,-0.8865,-0.886,-0.8855,-0.885,-0.8845,-0.884,-0.8835,-0.883,-0.8825,-0.882,-0.8815,-0.881,-0.8805,-0.88,-0.8795,-0.879,-0.8785,-0.878,-0.8775,-0.877,-0.8765,-0.876,-0.8755,-0.875,-0.8745,-0.874,-0.8735,-0.873,-0.8725,-0.872,-0.8715,-0.871,-0.8705,-0.87,-0.8695,-0.869,-0.8685,-0.868,-0.8675,-0.867,-0.8665,-0.866,-0.8655,-0.865,-0.8645,-0.864,-0.8635,-0.863,-0.8625,-0.862,-0.8615,-0.861,-0.8605,-0.86,-0.8595,-0.859,-0.8585,-0.858,-0.8575,-0.857,-0.8565,-0.856,-0.8555,-0.855,-0.8545,-0.854,-0.8535,-0.853,-0.8525,-0.852,-0.8515,-0.851,-0.8505,-0.85,-0.8495,-0.849,-0.8485,-0.848,-0.8475,-0.847,-0.8465,-0.846,-0.8455,-0.845,-0.8445,-0.844,-0.8435,-0.843,-0.8425,-0.842,-0.8415,-0.841,-0.8405,-0.84,-0.8395,-0.839,-0.8385,-0.838,-0.8375,-0.837,-0.8365,-0.836,-0.8355,-0.835,-0.8345,-0.834,-0.8335,-0.833,-0.8325,-0.832,-0.8315,-0.831,-0.8305,-0.83,-0.8295,-0.829,-0.8285,-0.828,-0.8275,-0.827,-0.8265,-0.826,-0.8255,-0.825,-0.8245,-0.824,-0.8235,-0.823,-0.8225,-0.822,-0.8215,-0.821,-0.8205,-0.82,-0.8195,-0.819,-0.8185,-0.818,-0.8175,-0.817,-0.8165,-0.816,-0.8155,-0.815,-0.8145,-0.814,-0.8135,-0.813,-0.8125,-0.812,-0.8115,-0.811,-0.8105,-0.81,-0.8095,-0.809,-0.8085,-0.808,-0.8075,-0.807,-0.8065,-0.806,-0.8055,-0.805,-0.8045,-0.804,-0.8035,-0.803,-0.8025,-0.802,-0.8015,-0.801,-0.8005,-0.8,-0.7995,-0.799,-0.7985,-0.798,-0.7975,-0.797,-0.7965,-0.796,-0.7955,-0.795,-0.7945,-0.794,-0.7935,-0.793,-0.7925,-0.792,-0.7915,-0.791,-0.7905,-0.79,-0.7895,-0.789,-0.7885,-0.788,-0.7875,-0.787,-0.7865,-0.786,-0.7855,-0.785,-0.7845,-0.784,-0.7835,-0.783,-0.7825,-0.782,-0.7815,-0.781,-0.7805,-0.78,-0.7795,-0.779,-0.7785,-0.778,-0.7775,-0.777,-0.7765,-0.776,-0.7755,-0.775,-0.7745,-0.774,-0.7735,-0.773,-0.7725,-0.772,-0.7715,-0.771,-0.7705,-0.77,-0.7695,-0.769,-0.7685,-0.768,-0.7675,-0.767,-0.7665,-0.766,-0.7655,-0.765,-0.7645,-0.764,-0.7635,-0.763,-0.7625,-0.762,-0.7615,-0.761,-0.7605,-0.76,-0.7595,-0.759,-0.7585,-0.758,-0.7575,-0.757,-0.7565,-0.756,-0.7555,-0.755,-0.7545,-0.754,-0.7535,-0.753,-0.7525,-0.752,-0.7515,-0.751,-0.7505,-0.75,-0.7495,-0.749,-0.7485,-0.748,-0.7475,-0.747,-0.7465,-0.746,-0.7455,-0.745,-0.7445,-0.744,-0.7435,-0.743,-0.7425,-0.742,-0.7415,-0.741,-0.7405,-0.74,-0.7395,-0.739,-0.7385,-0.738,-0.7375,-0.737,-0.7365,-0.736,-0.7355,-0.735,-0.7345,-0.734,-0.7335,-0.733,-0.7325,-0.732,-0.7315,-0.731,-0.7305,-0.73,-0.7295,-0.729,-0.7285,-0.728,-0.7275,-0.727,-0.7265,-0.726,-0.7255,-0.725,-0.7245,-0.724,-0.7235,-0.723,-0.7225,-0.722,-0.7215,-0.721,-0.7205,-0.72,-0.7195,-0.719,-0.7185,-0.718,-0.7175,-0.717,-0.7165,-0.716,-0.7155,-0.715,-0.7145,-0.714,-0.7135,-0.713,-0.7125,-0.712,-0.7115,-0.711,-0.7105,-0.71,-0.7095,-0.709,-0.7085,-0.708,-0.7075,-0.707,-0.7065,-0.706,-0.7055,-0.705,-0.7045,-0.704,-0.7035,-0.703,-0.7025,-0.702,-0.7015,-0.701,-0.7005,-0.7,-0.6995,-0.699,-0.6985,-0.698,-0.6975,-0.697,-0.6965,-0.696,-0.6955,-0.695,-0.6945,-0.694,-0.6935,-0.693,-0.6925,-0.692,-0.6915,-0.691,-0.6905,-0.69,-0.6895,-0.689,-0.6885,-0.688,-0.6875,-0.687,-0.6865,-0.686,-0.6855,-0.685,-0.6845,-0.684,-0.6835,-0.683,-0.6825,-0.682,-0.6815,-0.681,-0.6805,-0.68,-0.6795,-0.679,-0.6785,-0.678,-0.6775,-0.677,-0.6765,-0.676,-0.6755,-0.675,-0.6745,-0.674,-0.6735,-0.673,-0.6725,-0.672,-0.6715,-0.671,-0.6705,-0.67,-0.6695,-0.669,-0.6685,-0.668,-0.6675,-0.667,-0.6665,-0.666,-0.6655,-0.665,-0.6645,-0.664,-0.6635,-0.663,-0.6625,-0.662,-0.6615,-0.661,-0.6605,-0.66,-0.6595,-0.659,-0.6585,-0.658,-0.6575,-0.657,-0.6565,-0.656,-0.6555,-0.655,-0.6545,-0.654,-0.6535,-0.653,-0.6525,-0.652,-0.6515,-0.651,-0.6505,-0.65,-0.6495,-0.649,-0.6485,-0.648,-0.6475,-0.647,-0.6465,-0.646,-0.6455,-0.645,-0.6445,-0.644,-0.6435,-0.643,-0.6425,-0.642,-0.6415,-0.641,-0.6405,-0.64,-0.6395,-0.639,-0.6385,-0.638,-0.6375,-0.637,-0.6365,-0.636,-0.6355,-0.635,-0.6345,-0.634,-0.6335,-0.633,-0.6325,-0.632,-0.6315,-0.631,-0.6305,-0.63,-0.6295,-0.629,-0.6285,-0.628,-0.6275,-0.627,-0.6265,-0.626,-0.6255,-0.625,-0.6245,-0.624,-0.6235,-0.623,-0.6225,-0.622,-0.6215,-0.621,-0.6205,-0.62,-0.6195,-0.619,-0.6185,-0.618,-0.6175,-0.617,-0.6165,-0.616,-0.6155,-0.615,-0.6145,-0.614,-0.6135,-0.613,-0.6125,-0.612,-0.6115,-0.611,-0.6105,-0.61,-0.6095,-0.609,-0.6085,-0.608,-0.6075,-0.607,-0.6065,-0.606,-0.6055,-0.605,-0.6045,-0.604,-0.6035,-0.603,-0.6025,-0.602,-0.6015,-0.601,-0.6005,-0.6,-0.5995,-0.599,-0.5985,-0.598,-0.5975,-0.597,-0.5965,-0.596,-0.5955,-0.595,-0.5945,-0.594,-0.5935,-0.593,-0.5925,-0.592,-0.5915,-0.591,-0.5905,-0.59,-0.5895,-0.589,-0.5885,-0.588,-0.5875,-0.587,-0.5865,-0.586,-0.5855,-0.585,-0.5845,-0.584,-0.5835,-0.583,-0.5825,-0.582,-0.5815,-0.581,-0.5805,-0.58,-0.5795,-0.579,-0.5785,-0.578,-0.5775,-0.577,-0.5765,-0.576,-0.5755,-0.575,-0.5745,-0.574,-0.5735,-0.573,-0.5725,-0.572,-0.5715,-0.571,-0.5705,-0.57,-0.5695,-0.569,-0.5685,-0.568,-0.5675,-0.567,-0.5665,-0.566,-0.5655,-0.565,-0.5645,-0.564,-0.5635,-0.563,-0.5625,-0.562,-0.5615,-0.561,-0.5605,-0.56,-0.5595,-0.559,-0.5585,-0.558,-0.5575,-0.557,-0.5565,-0.556,-0.5555,-0.555,-0.5545,-0.554,-0.5535,-0.553,-0.5525,-0.552,-0.5515,-0.551,-0.5505,-0.55,-0.5495,-0.549,-0.5485,-0.548,-0.5475,-0.547,-0.5465,-0.546,-0.5455,-0.545,-0.5445,-0.544,-0.5435,-0.543,-0.5425,-0.542,-0.5415,-0.541,-0.5405,-0.54,-0.5395,-0.539,-0.5385,-0.538,-0.5375,-0.537,-0.5365,-0.536,-0.5355,-0.535,-0.5345,-0.534,-0.5335,-0.533,-0.5325,-0.532,-0.5315,-0.531,-0.5305,-0.53,-0.5295,-0.529,-0.5285,-0.528,-0.5275,-0.527,-0.5265,-0.526,-0.5255,-0.525,-0.5245,-0.524,-0.5235,-0.523,-0.5225,-0.522,-0.5215,-0.521,-0.5205,-0.52,-0.5195,-0.519,-0.5185,-0.518,-0.5175,-0.517,-0.5165,-0.516,-0.5155,-0.515,-0.5145,-0.514,-0.5135,-0.513,-0.5125,-0.512,-0.5115,-0.511,-0.5105,-0.51,-0.5095,-0.509,-0.5085,-0.508,-0.5075,-0.507,-0.5065,-0.506,-0.5055,-0.505,-0.5045,-0.504,-0.5035,-0.503,-0.5025,-0.502,-0.5015,-0.501,-0.5005,-0.5,-0.4995,-0.499,-0.4985,-0.498,-0.4975,-0.497,-0.4965,-0.496,-0.4955,-0.495,-0.4945,-0.494,-0.4935,-0.493,-0.4925,-0.492,-0.4915,-0.491,-0.4905,-0.49,-0.4895,-0.489,-0.4885,-0.488,-0.4875,-0.487,-0.4865,-0.486,-0.4855,-0.485,-0.4845,-0.484,-0.4835,-0.483,-0.4825,-0.482,-0.4815,-0.481,-0.4805,-0.48,-0.4795,-0.479,-0.4785,-0.478,-0.4775,-0.477,-0.4765,-0.476,-0.4755,-0.475,-0.4745,-0.474,-0.4735,-0.473,-0.4725,-0.472,-0.4715,-0.471,-0.4705,-0.47,-0.4695,-0.469,-0.4685,-0.468,-0.4675,-0.467,-0.4665,-0.466,-0.4655,-0.465,-0.4645,-0.464,-0.4635,-0.463,-0.4625,-0.462,-0.4615,-0.461,-0.4605,-0.46,-0.4595,-0.459,-0.4585,-0.458,-0.4575,-0.457,-0.4565,-0.456,-0.4555,-0.455,-0.4545,-0.454,-0.4535,-0.453,-0.4525,-0.452,-0.4515,-0.451,-0.4505,-0.45,-0.4495,-0.449,-0.4485,-0.448,-0.4475,-0.447,-0.4465,-0.446,-0.4455,-0.445,-0.4445,-0.444,-0.4435,-0.443,-0.4425,-0.442,-0.4415,-0.441,-0.4405,-0.44,-0.4395,-0.439,-0.4385,-0.438,-0.4375,-0.437,-0.4365,-0.436,-0.4355,-0.435,-0.4345,-0.434,-0.4335,-0.433,-0.4325,-0.432,-0.4315,-0.431,-0.4305,-0.43,-0.4295,-0.429,-0.4285,-0.428,-0.4275,-0.427,-0.4265,-0.426,-0.4255,-0.425,-0.4245,-0.424,-0.4235,-0.423,-0.4225,-0.422,-0.4215,-0.421,-0.4205,-0.42,-0.4195,-0.419,-0.4185,-0.418,-0.4175,-0.417,-0.4165,-0.416,-0.4155,-0.415,-0.4145,-0.414,-0.4135,-0.413,-0.4125,-0.412,-0.4115,-0.411,-0.4105,-0.41,-0.4095,-0.409,-0.4085,-0.408,-0.4075,-0.407,-0.4065,-0.406,-0.4055,-0.405,-0.4045,-0.404,-0.4035,-0.403,-0.4025,-0.402,-0.4015,-0.401,-0.4005,-0.4,-0.3995,-0.399,-0.3985,-0.398,-0.3975,-0.397,-0.3965,-0.396,-0.3955,-0.395,-0.3945,-0.394,-0.3935,-0.393,-0.3925,-0.392,-0.3915,-0.391,-0.3905,-0.39,-0.3895,-0.389,-0.3885,-0.388,-0.3875,-0.387,-0.3865,-0.386,-0.3855,-0.385,-0.3845,-0.384,-0.3835,-0.383,-0.3825,-0.382,-0.3815,-0.381,-0.3805,-0.38,-0.3795,-0.379,-0.3785,-0.378,-0.3775,-0.377,-0.3765,-0.376,-0.3755,-0.375,-0.3745,-0.374,-0.3735,-0.373,-0.3725,-0.372,-0.3715,-0.371,-0.3705,-0.37,-0.3695,-0.369,-0.3685,-0.368,-0.3675,-0.367,-0.3665,-0.366,-0.3655,-0.365,-0.3645,-0.364,-0.3635,-0.363,-0.3625,-0.362,-0.3615,-0.361,-0.3605,-0.36,-0.3595,-0.359,-0.3585,-0.358,-0.3575,-0.357,-0.3565,-0.356,-0.3555,-0.355,-0.3545,-0.354,-0.3535,-0.353,-0.3525,-0.352,-0.3515,-0.351,-0.3505,-0.35,-0.3495,-0.349,-0.3485,-0.348,-0.3475,-0.347,-0.3465,-0.346,-0.3455,-0.345,-0.3445,-0.344,-0.3435,-0.343,-0.3425,-0.342,-0.3415,-0.341,-0.3405,-0.34,-0.3395,-0.339,-0.3385,-0.338,-0.3375,-0.337,-0.3365,-0.336,-0.3355,-0.335,-0.3345,-0.334,-0.3335,-0.333,-0.3325,-0.332,-0.3315,-0.331,-0.3305,-0.33,-0.3295,-0.329,-0.3285,-0.328,-0.3275,-0.327,-0.3265,-0.326,-0.3255,-0.325,-0.3245,-0.324,-0.3235,-0.323,-0.3225,-0.322,-0.3215,-0.321,-0.3205,-0.32,-0.3195,-0.319,-0.3185,-0.318,-0.3175,-0.317,-0.3165,-0.316,-0.3155,-0.315,-0.3145,-0.314,-0.3135,-0.313,-0.3125,-0.312,-0.3115,-0.311,-0.3105,-0.31,-0.3095,-0.309,-0.3085,-0.308,-0.3075,-0.307,-0.3065,-0.306,-0.3055,-0.305,-0.3045,-0.304,-0.3035,-0.303,-0.3025,-0.302,-0.3015,-0.301,-0.3005,-0.3,-0.2995,-0.299,-0.2985,-0.298,-0.2975,-0.297,-0.2965,-0.296,-0.2955,-0.295,-0.2945,-0.294,-0.2935,-0.293,-0.2925,-0.292,-0.2915,-0.291,-0.2905,-0.29,-0.2895,-0.289,-0.2885,-0.288,-0.2875,-0.287,-0.2865,-0.286,-0.2855,-0.285,-0.2845,-0.284,-0.2835,-0.283,-0.2825,-0.282,-0.2815,-0.281,-0.2805,-0.28,-0.2795,-0.279,-0.2785,-0.278,-0.2775,-0.277,-0.2765,-0.276,-0.2755,-0.275,-0.2745,-0.274,-0.2735,-0.273,-0.2725,-0.272,-0.2715,-0.271,-0.2705,-0.27,-0.2695,-0.269,-0.2685,-0.268,-0.2675,-0.267,-0.2665,-0.266,-0.2655,-0.265,-0.2645,-0.264,-0.2635,-0.263,-0.2625,-0.262,-0.2615,-0.261,-0.2605,-0.26,-0.2595,-0.259,-0.2585,-0.258,-0.2575,-0.257,-0.2565,-0.256,-0.2555,-0.255,-0.2545,-0.254,-0.2535,-0.253,-0.2525,-0.252,-0.2515,-0.251,-0.2505,-0.25,-0.2495,-0.249,-0.2485,-0.248,-0.2475,-0.247,-0.2465,-0.246,-0.2455,-0.245,-0.2445,-0.244,-0.2435,-0.243,-0.2425,-0.242,-0.2415,-0.241,-0.2405,-0.24,-0.2395,-0.239,-0.2385,-0.238,-0.2375,-0.237,-0.2365,-0.236,-0.2355,-0.235,-0.2345,-0.234,-0.2335,-0.233,-0.2325,-0.232,-0.2315,-0.231,-0.2305,-0.23,-0.2295,-0.229,-0.2285,-0.228,-0.2275,-0.227,-0.2265,-0.226,-0.2255,-0.225,-0.2245,-0.224,-0.2235,-0.223,-0.2225,-0.222,-0.2215,-0.221,-0.2205,-0.22,-0.2195,-0.219,-0.2185,-0.218,-0.2175,-0.217,-0.2165,-0.216,-0.2155,-0.215,-0.2145,-0.214,-0.2135,-0.213,-0.2125,-0.212,-0.2115,-0.211,-0.2105,-0.21,-0.2095,-0.209,-0.2085,-0.208,-0.2075,-0.207,-0.2065,-0.206,-0.2055,-0.205,-0.2045,-0.204,-0.2035,-0.203,-0.2025,-0.202,-0.2015,-0.201,-0.2005,-0.2,-0.1995,-0.199,-0.1985,-0.198,-0.1975,-0.197,-0.1965,-0.196,-0.1955,-0.195,-0.1945,-0.194,-0.1935,-0.193,-0.1925,-0.192,-0.1915,-0.191,-0.1905,-0.19,-0.1895,-0.189,-0.1885,-0.188,-0.1875,-0.187,-0.1865,-0.186,-0.1855,-0.185,-0.1845,-0.184,-0.1835,-0.183,-0.1825,-0.182,-0.1815,-0.181,-0.1805,-0.18,-0.1795,-0.179,-0.1785,-0.178,-0.1775,-0.177,-0.1765,-0.176,-0.1755,-0.175,-0.1745,-0.174,-0.1735,-0.173,-0.1725,-0.172,-0.1715,-0.171,-0.1705,-0.17,-0.1695,-0.169,-0.1685,-0.168,-0.1675,-0.167,-0.1665,-0.166,-0.1655,-0.165,-0.1645,-0.164,-0.1635,-0.163,-0.1625,-0.162,-0.1615,-0.161,-0.1605,-0.16,-0.1595,-0.159,-0.1585,-0.158,-0.1575,-0.157,-0.1565,-0.156,-0.1555,-0.155,-0.1545,-0.154,-0.1535,-0.153,-0.1525,-0.152,-0.1515,-0.151,-0.1505,-0.15,-0.1495,-0.149,-0.1485,-0.148,-0.1475,-0.147,-0.1465,-0.146,-0.1455,-0.145,-0.1445,-0.144,-0.1435,-0.143,-0.1425,-0.142,-0.1415,-0.141,-0.1405,-0.14,-0.1395,-0.139,-0.1385,-0.138,-0.1375,-0.137,-0.1365,-0.136,-0.1355,-0.135,-0.1345,-0.134,-0.1335,-0.133,-0.1325,-0.132,-0.1315,-0.131,-0.1305,-0.13,-0.1295,-0.129,-0.1285,-0.128,-0.1275,-0.127,-0.1265,-0.126,-0.1255,-0.125,-0.1245,-0.124,-0.1235,-0.123,-0.1225,-0.122,-0.1215,-0.121,-0.1205,-0.12,-0.1195,-0.119,-0.1185,-0.118,-0.1175,-0.117,-0.1165,-0.116,-0.1155,-0.115,-0.1145,-0.114,-0.1135,-0.113,-0.1125,-0.112,-0.1115,-0.111,-0.1105,-0.11,-0.1095,-0.109,-0.1085,-0.108,-0.1075,-0.107,-0.1065,-0.106,-0.1055,-0.105,-0.1045,-0.104,-0.1035,-0.103,-0.1025,-0.102,-0.1015,-0.101,-0.1005,-0.1,-0.0995,-0.099,-0.0985,-0.098,-0.0975,-0.097,-0.0965,-0.096,-0.0955,-0.095,-0.0945,-0.094,-0.0935,-0.093,-0.0925,-0.092,-0.0915,-0.091,-0.0905,-0.09,-0.0895,-0.089,-0.0885,-0.088,-0.0875,-0.087,-0.0865,-0.086,-0.0855,-0.085,-0.0845,-0.084,-0.0835,-0.083,-0.0825,-0.082,-0.0815,-0.081,-0.0805,-0.08,-0.0795,-0.079,-0.0785,-0.078,-0.0775,-0.077,-0.0765,-0.076,-0.0755,-0.075,-0.0745,-0.074,-0.0735,-0.073,-0.0725,-0.072,-0.0715,-0.071,-0.0705,-0.07,-0.0695,-0.069,-0.0685,-0.068,-0.0675,-0.067,-0.0665,-0.066,-0.0655,-0.065,-0.0645,-0.064,-0.0635,-0.063,-0.0625,-0.062,-0.0615,-0.061,-0.0605,-0.06,-0.0595,-0.059,-0.0585,-0.058,-0.0575,-0.057,-0.0565,-0.056,-0.0555,-0.055,-0.0545,-0.054,-0.0535,-0.053,-0.0525,-0.052,-0.0515,-0.051,-0.0505,-0.05,-0.0495,-0.049,-0.0485,-0.048,-0.0475,-0.047,-0.0465,-0.046,-0.0455,-0.045,-0.0445,-0.044,-0.0435,-0.043,-0.0425,-0.042,-0.0415,-0.041,-0.0405,-0.04,-0.0395,-0.039,-0.0385,-0.038,-0.0375,-0.037,-0.0365,-0.036,-0.0355,-0.035,-0.0345,-0.034,-0.0335,-0.033,-0.0325,-0.032,-0.0315,-0.031,-0.0305,-0.03,-0.0295,-0.029,-0.0285,-0.028,-0.0275,-0.027,-0.0265,-0.026,-0.0255,-0.025,-0.0245,-0.024,-0.0235,-0.023,-0.0225,-0.022,-0.0215,-0.021,-0.0205,-0.02,-0.0195,-0.019,-0.0185,-0.018,-0.0175,-0.017,-0.0165,-0.016,-0.0155,-0.015,-0.0145,-0.014,-0.0135,-0.013,-0.0125,-0.012,-0.0115,-0.011,-0.0105,-0.01,-0.0095,-0.009,-0.0085,-0.008,-0.0075,-0.007,-0.0065,-0.006,-0.0055,-0.005,-0.0045,-0.004,-0.0035,-0.003,-0.0025,-0.002,-0.0015,-0.001,-0.0005,0]) },
        { name: "4k sine", expression: 1.0, samples: centerWave([0,0.001570795681,0.003141587486,0.004712371539,0.006283143966,0.007853900889,0.009424638433,0.01099535272,0.01256603988,0.01413669604,0.01570731731,0.01727789983,0.01884843972,0.02041893309,0.02198937609,0.02355976483,0.02513009544,0.02670036405,0.02827056677,0.02984069974,0.03141075908,0.03298074091,0.03455064137,0.03612045658,0.03769018267,0.03925981576,0.04082935198,0.04239878746,0.04396811832,0.04553734069,0.04710645071,0.0486754445,0.05024431818,0.05181306789,0.05338168976,0.05495017991,0.05651853448,0.0580867496,0.05965482139,0.06122274599,0.06279051953,0.06435813814,0.06592559795,0.0674928951,0.06906002571,0.07062698593,0.07219377188,0.0737603797,0.07532680553,0.07689304549,0.07845909573,0.08002495237,0.08159061157,0.08315606944,0.08472132214,0.0862863658,0.08785119655,0.08941581054,0.0909802039,0.09254437278,0.09410831332,0.09567202165,0.09723549392,0.09879872627,0.1003617149,0.1019244558,0.1034869453,0.1050491794,0.1066111543,0.1081728661,0.1097343111,0.1112954853,0.1128563849,0.114417006,0.1159773448,0.1175373975,0.1190971601,0.1206566289,0.1222157999,0.1237746695,0.1253332336,0.1268914884,0.1284494302,0.130007055,0.1315643591,0.1331213385,0.1346779895,0.1362343082,0.1377902907,0.1393459332,0.1409012319,0.142456183,0.1440107826,0.1455650268,0.1471189118,0.1486724339,0.1502255891,0.1517783737,0.1533307837,0.1548828155,0.156434465,0.1579857286,0.1595366024,0.1610870825,0.1626371652,0.1641868466,0.1657361228,0.1672849901,0.1688334447,0.1703814827,0.1719291003,0.1734762936,0.175023059,0.1765693925,0.1781152903,0.1796607486,0.1812057636,0.1827503316,0.1842944486,0.1858381108,0.1873813146,0.188924056,0.1904663312,0.1920081365,0.1935494681,0.195090322,0.1966306946,0.198170582,0.1997099805,0.2012488862,0.2027872954,0.2043252041,0.2058626088,0.2073995055,0.2089358904,0.2104717598,0.2120071099,0.2135419369,0.215076237,0.2166100064,0.2181432414,0.2196759381,0.2212080928,0.2227397017,0.2242707609,0.2258012669,0.2273312156,0.2288606035,0.2303894267,0.2319176814,0.2334453639,0.2349724703,0.236498997,0.2380249402,0.239550296,0.2410750608,0.2425992308,0.2441228022,0.2456457712,0.2471681341,0.2486898872,0.2502110266,0.2517315487,0.2532514496,0.2547707257,0.2562893731,0.2578073882,0.2593247672,0.2608415063,0.2623576018,0.26387305,0.2653878471,0.2669019893,0.268415473,0.2699282945,0.2714404499,0.2729519355,0.2744627477,0.2759728826,0.2774823367,0.278991106,0.280499187,0.2820065759,0.283513269,0.2850192625,0.2865245527,0.288029136,0.2895330086,0.2910361668,0.2925386069,0.2940403252,0.295541318,0.2970415816,0.2985411122,0.3000399062,0.3015379599,0.3030352696,0.3045318316,0.3060276422,0.3075226977,0.3090169944,0.3105105286,0.3120032967,0.3134952949,0.3149865197,0.3164769672,0.3179666338,0.3194555159,0.3209436098,0.3224309118,0.3239174182,0.3254031254,0.3268880297,0.3283721274,0.3298554149,0.3313378885,0.3328195445,0.3343003794,0.3357803894,0.3372595709,0.3387379202,0.3402154338,0.3416921079,0.3431679389,0.3446429232,0.3461170571,0.347590337,0.3490627592,0.3505343202,0.3520050163,0.3534748438,0.3549437991,0.3564118787,0.3578790789,0.359345396,0.3608108265,0.3622753667,0.363739013,0.3652017619,0.3666636096,0.3681245527,0.3695845874,0.3710437102,0.3725019175,0.3739592057,0.3754155712,0.3768710104,0.3783255197,0.3797790955,0.3812317343,0.3826834324,0.3841341862,0.3855839923,0.3870328469,0.3884807466,0.3899276878,0.3913736668,0.3928186802,0.3942627243,0.3957057957,0.3971478906,0.3985890057,0.4000291372,0.4014682818,0.4029064357,0.4043435955,0.4057797577,0.4072149186,0.4086490747,0.4100822226,0.4115143586,0.4129454793,0.414375581,0.4158046603,0.4172327137,0.4186597375,0.4200857284,0.4215106828,0.4229345971,0.4243574679,0.4257792916,0.4272000647,0.4286197838,0.4300384453,0.4314560457,0.4328725815,0.4342880493,0.4357024455,0.4371157667,0.4385280093,0.4399391699,0.4413492449,0.442758231,0.4441661247,0.4455729224,0.4469786207,0.4483832161,0.4497867052,0.4511890844,0.4525903505,0.4539904997,0.4553895289,0.4567874343,0.4581842127,0.4595798606,0.4609743745,0.462367751,0.4637599867,0.4651510781,0.4665410217,0.4679298143,0.4693174522,0.4707039322,0.4720892507,0.4734734044,0.4748563899,0.4762382037,0.4776188424,0.4789983026,0.480376581,0.4817536741,0.4831295785,0.4845042908,0.4858778077,0.4872501257,0.4886212415,0.4899911516,0.4913598528,0.4927273415,0.4940936146,0.4954586684,0.4968224998,0.4981851053,0.4995464816,0.5009066254,0.5022655331,0.5036232016,0.5049796275,0.5063348074,0.5076887379,0.5090414158,0.5103928376,0.5117430001,0.5130918999,0.5144395338,0.5157858983,0.5171309901,0.518474806,0.5198173426,0.5211585966,0.5224985647,0.5238372436,0.52517463,0.5265107205,0.5278455119,0.529179001,0.5305111843,0.5318420587,0.5331716207,0.5344998673,0.535826795,0.5371524006,0.5384766808,0.5397996324,0.5411212521,0.5424415367,0.5437604828,0.5450780872,0.5463943467,0.5477092581,0.549022818,0.5503350233,0.5516458706,0.5529553569,0.5542634787,0.555570233,0.5568756165,0.5581796259,0.5594822581,0.5607835098,0.5620833779,0.563381859,0.5646789501,0.5659746478,0.5672689491,0.5685618507,0.5698533495,0.5711434422,0.5724321256,0.5737193966,0.575005252,0.5762896887,0.5775727034,0.578854293,0.5801344544,0.5814131843,0.5826904797,0.5839663373,0.585240754,0.5865137267,0.5877852523,0.5890553275,0.5903239494,0.5915911146,0.5928568202,0.5941210629,0.5953838397,0.5966451475,0.5979049831,0.5991633434,0.6004202253,0.6016756258,0.6029295417,0.6041819699,0.6054329074,0.606682351,0.6079302977,0.6091767444,0.610421688,0.6116651254,0.6129070537,0.6141474696,0.6153863702,0.6166237524,0.6178596131,0.6190939493,0.620326758,0.621558036,0.6227877805,0.6240159883,0.6252426563,0.6264677817,0.6276913613,0.6289133921,0.6301338712,0.6313527954,0.6325701619,0.6337859676,0.6350002094,0.6362128845,0.6374239897,0.6386335222,0.639841479,0.6410478569,0.6422526532,0.6434558647,0.6446574886,0.6458575219,0.6470559616,0.6482528047,0.6494480483,0.6506416895,0.6518337253,0.6530241528,0.6542129689,0.6554001709,0.6565857558,0.6577697205,0.6589520623,0.6601327782,0.6613118653,0.6624893207,0.6636651414,0.6648393246,0.6660118674,0.6671827669,0.6683520202,0.6695196243,0.6706855765,0.6718498739,0.6730125135,0.6741734925,0.6753328081,0.6764904574,0.6776464375,0.6788007455,0.6799533787,0.6811043342,0.6822536091,0.6834012006,0.6845471059,0.6856913222,0.6868338465,0.6879746762,0.6891138084,0.6902512402,0.691386969,0.6925209917,0.6936533058,0.6947839084,0.6959127966,0.6970399677,0.698165419,0.6992891476,0.7004111508,0.7015314258,0.7026499698,0.7037667801,0.7048818539,0.7059951886,0.7071067812,0.7082166291,0.7093247296,0.7104310798,0.7115356772,0.7126385189,0.7137396023,0.7148389245,0.715936483,0.717032275,0.7181262978,0.7192185486,0.7203090249,0.7213977239,0.7224846429,0.7235697792,0.7246531302,0.7257346932,0.7268144655,0.7278924445,0.7289686274,0.7300430117,0.7311155947,0.7321863738,0.7332553462,0.7343225094,0.7353878608,0.7364513976,0.7375131174,0.7385730173,0.739631095,0.7406873476,0.7417417727,0.7427943677,0.7438451298,0.7448940566,0.7459411454,0.7469863937,0.7480297989,0.7490713584,0.7501110696,0.75114893,0.7521849371,0.7532190881,0.7542513807,0.7552818123,0.7563103803,0.7573370821,0.7583619153,0.7593848773,0.7604059656,0.7614251777,0.762442511,0.7634579631,0.7644715314,0.7654832135,0.7664930068,0.7675009089,0.7685069172,0.7695110293,0.7705132428,0.771513555,0.7725119637,0.7735084662,0.7745030602,0.7754957432,0.7764865127,0.7774753663,0.7784623016,0.7794473161,0.7804304073,0.781411573,0.7823908106,0.7833681177,0.7843434919,0.7853169309,0.7862884321,0.7872579933,0.788225612,0.7891912858,0.7901550124,0.7911167893,0.7920766142,0.7930344848,0.7939903986,0.7949443534,0.7958963467,0.7968463762,0.7977944395,0.7987405344,0.7996846585,0.8006268094,0.8015669849,0.8025051825,0.8034414001,0.8043756353,0.8053078857,0.8062381491,0.8071664232,0.8080927058,0.8090169944,0.8099392868,0.8108595808,0.8117778741,0.8126941644,0.8136084495,0.8145207271,0.8154309949,0.8163392507,0.8172454923,0.8181497174,0.8190519238,0.8199521093,0.8208502717,0.8217464086,0.822640518,0.8235325976,0.8244226453,0.8253106587,0.8261966358,0.8270805743,0.827962472,0.8288423269,0.8297201367,0.8305958992,0.8314696123,0.8323412738,0.8332108817,0.8340784336,0.8349439276,0.8358073614,0.8366687329,0.83752804,0.8383852807,0.8392404527,0.8400935539,0.8409445823,0.8417935358,0.8426404122,0.8434852094,0.8443279255,0.8451685583,0.8460071057,0.8468435656,0.8476779361,0.848510215,0.8493404003,0.8501684899,0.8509944818,0.851818374,0.8526401644,0.8534598509,0.8542774317,0.8550929046,0.8559062677,0.8567175189,0.8575266562,0.8583336777,0.8591385813,0.859941365,0.860742027,0.8615405652,0.8623369776,0.8631312622,0.8639234172,0.8647134405,0.8655013303,0.8662870844,0.8670707012,0.8678521785,0.8686315144,0.8694087071,0.8701837547,0.8709566551,0.8717274065,0.8724960071,0.8732624548,0.8740267479,0.8747888843,0.8755488624,0.87630668,0.8770623355,0.877815827,0.8785671525,0.8793163102,0.8800632983,0.8808081149,0.8815507582,0.8822912264,0.8830295177,0.8837656301,0.8844995619,0.8852313113,0.8859608765,0.8866882557,0.8874134471,0.8881364488,0.8888572592,0.8895758764,0.8902922986,0.8910065242,0.8917185513,0.8924283781,0.893136003,0.8938414242,0.8945446398,0.8952456483,0.8959444479,0.8966410368,0.8973354133,0.8980275758,0.8987175224,0.8994052516,0.9000907615,0.9007740506,0.9014551171,0.9021339594,0.9028105757,0.9034849644,0.9041571239,0.9048270525,0.9054947485,0.9061602102,0.9068234361,0.9074844245,0.9081431738,0.9087996824,0.9094539485,0.9101059707,0.9107557473,0.9114032766,0.9120485572,0.9126915874,0.9133323656,0.9139708903,0.9146071598,0.9152411726,0.9158729272,0.9165024219,0.9171296553,0.9177546257,0.9183773316,0.9189977716,0.919615944,0.9202318474,0.9208454801,0.9214568408,0.9220659279,0.9226727399,0.9232772752,0.9238795325,0.9244795102,0.9250772068,0.9256726209,0.926265751,0.9268565956,0.9274451533,0.9280314227,0.9286154021,0.9291970904,0.9297764859,0.9303535873,0.9309283931,0.931500902,0.9320711125,0.9326390231,0.9332046326,0.9337679395,0.9343289425,0.93488764,0.9354440308,0.9359981135,0.9365498867,0.9370993491,0.9376464993,0.9381913359,0.9387338577,0.9392740632,0.9398119511,0.9403475201,0.940880769,0.9414116963,0.9419403007,0.942466581,0.9429905359,0.943512164,0.9440314641,0.944548435,0.9450630752,0.9455753836,0.9460853588,0.9465929997,0.947098305,0.9476012734,0.9481019037,0.9486001946,0.949096145,0.9495897536,0.9500810191,0.9505699404,0.9510565163,0.9515407455,0.9520226269,0.9525021593,0.9529793415,0.9534541723,0.9539266506,0.9543967751,0.9548645447,0.9553299584,0.9557930148,0.9562537129,0.9567120516,0.9571680296,0.957621646,0.9580728995,0.958521789,0.9589683135,0.9594124719,0.9598542629,0.9602936857,0.960730739,0.9611654218,0.961597733,0.9620276716,0.9624552365,0.9628804266,0.9633032409,0.9637236783,0.9641417378,0.9645574185,0.9649707191,0.9653816388,0.9657901766,0.9661963313,0.966600102,0.9670014878,0.9674004875,0.9677971003,0.9681913252,0.9685831611,0.9689726072,0.9693596624,0.9697443258,0.9701265965,0.9705064735,0.9708839558,0.9712590426,0.9716317329,0.9720020258,0.9723699204,0.9727354158,0.973098511,0.9734592052,0.9738174975,0.974173387,0.9745268728,0.9748779541,0.9752266299,0.9755728995,0.9759167619,0.9762582164,0.9765972621,0.9769338981,0.9772681236,0.9775999378,0.9779293398,0.978256329,0.9785809043,0.9789030651,0.9792228106,0.97954014,0.9798550524,0.9801675471,0.9804776234,0.9807852804,0.9810905174,0.9813933337,0.9816937285,0.9819917011,0.9822872507,0.9825803766,0.9828710781,0.9831593545,0.983445205,0.9837286289,0.9840096257,0.9842881944,0.9845643345,0.9848380453,0.9851093262,0.9853781763,0.9856445951,0.985908582,0.9861701362,0.9864292572,0.9866859442,0.9869401967,0.987192014,0.9874413955,0.9876883406,0.9879328487,0.9881749191,0.9884145513,0.9886517447,0.9888864987,0.9891188128,0.9893486862,0.9895761186,0.9898011093,0.9900236577,0.9902437634,0.9904614257,0.9906766442,0.9908894182,0.9910997474,0.9913076311,0.9915130688,0.9917160601,0.9919166044,0.9921147013,0.9923103502,0.9925035507,0.9926943023,0.9928826046,0.993068457,0.993251859,0.9934328104,0.9936113105,0.993787359,0.9939609555,0.9941320994,0.9943007904,0.9944670281,0.994630812,0.9947921418,0.994951017,0.9951074373,0.9952614022,0.9954129114,0.9955619646,0.9957085613,0.9958527012,0.9959943839,0.9961336091,0.9962703765,0.9964046856,0.9965365363,0.996665928,0.9967928606,0.9969173337,0.997039347,0.9971589003,0.9972759931,0.9973906252,0.9975027964,0.9976125064,0.9977197548,0.9978245415,0.9979268661,0.9980267284,0.9981241282,0.9982190653,0.9983115393,0.9984015501,0.9984890975,0.9985741811,0.9986568009,0.9987369566,0.998814648,0.998889875,0.9989626372,0.9990329347,0.9991007671,0.9991661343,0.9992290362,0.9992894726,0.9993474434,0.9994029484,0.9994559874,0.9995065604,0.9995546672,0.9996003077,0.9996434817,0.9996841893,0.9997224302,0.9997582044,0.9997915119,0.9998223524,0.9998507259,0.9998766325,0.9999000719,0.9999210442,0.9999395493,0.9999555871,0.9999691576,0.9999802609,0.9999888967,0.9999950652,0.9999987663,1,0.9999987663,0.9999950652,0.9999888967,0.9999802609,0.9999691576,0.9999555871,0.9999395493,0.9999210442,0.9999000719,0.9998766325,0.9998507259,0.9998223524,0.9997915119,0.9997582044,0.9997224302,0.9996841893,0.9996434817,0.9996003077,0.9995546672,0.9995065604,0.9994559874,0.9994029484,0.9993474434,0.9992894726,0.9992290362,0.9991661343,0.9991007671,0.9990329347,0.9989626372,0.998889875,0.998814648,0.9987369566,0.9986568009,0.9985741811,0.9984890975,0.9984015501,0.9983115393,0.9982190653,0.9981241282,0.9980267284,0.9979268661,0.9978245415,0.9977197548,0.9976125064,0.9975027964,0.9973906252,0.9972759931,0.9971589003,0.997039347,0.9969173337,0.9967928606,0.996665928,0.9965365363,0.9964046856,0.9962703765,0.9961336091,0.9959943839,0.9958527012,0.9957085613,0.9955619646,0.9954129114,0.9952614022,0.9951074373,0.994951017,0.9947921418,0.994630812,0.9944670281,0.9943007904,0.9941320994,0.9939609555,0.993787359,0.9936113105,0.9934328104,0.993251859,0.993068457,0.9928826046,0.9926943023,0.9925035507,0.9923103502,0.9921147013,0.9919166044,0.9917160601,0.9915130688,0.9913076311,0.9910997474,0.9908894182,0.9906766442,0.9904614257,0.9902437634,0.9900236577,0.9898011093,0.9895761186,0.9893486862,0.9891188128,0.9888864987,0.9886517447,0.9884145513,0.9881749191,0.9879328487,0.9876883406,0.9874413955,0.987192014,0.9869401967,0.9866859442,0.9864292572,0.9861701362,0.985908582,0.9856445951,0.9853781763,0.9851093262,0.9848380453,0.9845643345,0.9842881944,0.9840096257,0.9837286289,0.983445205,0.9831593545,0.9828710781,0.9825803766,0.9822872507,0.9819917011,0.9816937285,0.9813933337,0.9810905174,0.9807852804,0.9804776234,0.9801675471,0.9798550524,0.97954014,0.9792228106,0.9789030651,0.9785809043,0.978256329,0.9779293398,0.9775999378,0.9772681236,0.9769338981,0.9765972621,0.9762582164,0.9759167619,0.9755728995,0.9752266299,0.9748779541,0.9745268728,0.974173387,0.9738174975,0.9734592052,0.973098511,0.9727354158,0.9723699204,0.9720020258,0.9716317329,0.9712590426,0.9708839558,0.9705064735,0.9701265965,0.9697443258,0.9693596624,0.9689726072,0.9685831611,0.9681913252,0.9677971003,0.9674004875,0.9670014878,0.966600102,0.9661963313,0.9657901766,0.9653816388,0.9649707191,0.9645574185,0.9641417378,0.9637236783,0.9633032409,0.9628804266,0.9624552365,0.9620276716,0.961597733,0.9611654218,0.960730739,0.9602936857,0.9598542629,0.9594124719,0.9589683135,0.958521789,0.9580728995,0.957621646,0.9571680296,0.9567120516,0.9562537129,0.9557930148,0.9553299584,0.9548645447,0.9543967751,0.9539266506,0.9534541723,0.9529793415,0.9525021593,0.9520226269,0.9515407455,0.9510565163,0.9505699404,0.9500810191,0.9495897536,0.949096145,0.9486001946,0.9481019037,0.9476012734,0.947098305,0.9465929997,0.9460853588,0.9455753836,0.9450630752,0.944548435,0.9440314641,0.943512164,0.9429905359,0.942466581,0.9419403007,0.9414116963,0.940880769,0.9403475201,0.9398119511,0.9392740632,0.9387338577,0.9381913359,0.9376464993,0.9370993491,0.9365498867,0.9359981135,0.9354440308,0.93488764,0.9343289425,0.9337679395,0.9332046326,0.9326390231,0.9320711125,0.931500902,0.9309283931,0.9303535873,0.9297764859,0.9291970904,0.9286154021,0.9280314227,0.9274451533,0.9268565956,0.926265751,0.9256726209,0.9250772068,0.9244795102,0.9238795325,0.9232772752,0.9226727399,0.9220659279,0.9214568408,0.9208454801,0.9202318474,0.919615944,0.9189977716,0.9183773316,0.9177546257,0.9171296553,0.9165024219,0.9158729272,0.9152411726,0.9146071598,0.9139708903,0.9133323656,0.9126915874,0.9120485572,0.9114032766,0.9107557473,0.9101059707,0.9094539485,0.9087996824,0.9081431738,0.9074844245,0.9068234361,0.9061602102,0.9054947485,0.9048270525,0.9041571239,0.9034849644,0.9028105757,0.9021339594,0.9014551171,0.9007740506,0.9000907615,0.8994052516,0.8987175224,0.8980275758,0.8973354133,0.8966410368,0.8959444479,0.8952456483,0.8945446398,0.8938414242,0.893136003,0.8924283781,0.8917185513,0.8910065242,0.8902922986,0.8895758764,0.8888572592,0.8881364488,0.8874134471,0.8866882557,0.8859608765,0.8852313113,0.8844995619,0.8837656301,0.8830295177,0.8822912264,0.8815507582,0.8808081149,0.8800632983,0.8793163102,0.8785671525,0.877815827,0.8770623355,0.87630668,0.8755488624,0.8747888843,0.8740267479,0.8732624548,0.8724960071,0.8717274065,0.8709566551,0.8701837547,0.8694087071,0.8686315144,0.8678521785,0.8670707012,0.8662870844,0.8655013303,0.8647134405,0.8639234172,0.8631312622,0.8623369776,0.8615405652,0.860742027,0.859941365,0.8591385813,0.8583336777,0.8575266562,0.8567175189,0.8559062677,0.8550929046,0.8542774317,0.8534598509,0.8526401644,0.851818374,0.8509944818,0.8501684899,0.8493404003,0.848510215,0.8476779361,0.8468435656,0.8460071057,0.8451685583,0.8443279255,0.8434852094,0.8426404122,0.8417935358,0.8409445823,0.8400935539,0.8392404527,0.8383852807,0.83752804,0.8366687329,0.8358073614,0.8349439276,0.8340784336,0.8332108817,0.8323412738,0.8314696123,0.8305958992,0.8297201367,0.8288423269,0.827962472,0.8270805743,0.8261966358,0.8253106587,0.8244226453,0.8235325976,0.822640518,0.8217464086,0.8208502717,0.8199521093,0.8190519238,0.8181497174,0.8172454923,0.8163392507,0.8154309949,0.8145207271,0.8136084495,0.8126941644,0.8117778741,0.8108595808,0.8099392868,0.8090169944,0.8080927058,0.8071664232,0.8062381491,0.8053078857,0.8043756353,0.8034414001,0.8025051825,0.8015669849,0.8006268094,0.7996846585,0.7987405344,0.7977944395,0.7968463762,0.7958963467,0.7949443534,0.7939903986,0.7930344848,0.7920766142,0.7911167893,0.7901550124,0.7891912858,0.788225612,0.7872579933,0.7862884321,0.7853169309,0.7843434919,0.7833681177,0.7823908106,0.781411573,0.7804304073,0.7794473161,0.7784623016,0.7774753663,0.7764865127,0.7754957432,0.7745030602,0.7735084662,0.7725119637,0.771513555,0.7705132428,0.7695110293,0.7685069172,0.7675009089,0.7664930068,0.7654832135,0.7644715314,0.7634579631,0.762442511,0.7614251777,0.7604059656,0.7593848773,0.7583619153,0.7573370821,0.7563103803,0.7552818123,0.7542513807,0.7532190881,0.7521849371,0.75114893,0.7501110696,0.7490713584,0.7480297989,0.7469863937,0.7459411454,0.7448940566,0.7438451298,0.7427943677,0.7417417727,0.7406873476,0.739631095,0.7385730173,0.7375131174,0.7364513976,0.7353878608,0.7343225094,0.7332553462,0.7321863738,0.7311155947,0.7300430117,0.7289686274,0.7278924445,0.7268144655,0.7257346932,0.7246531302,0.7235697792,0.7224846429,0.7213977239,0.7203090249,0.7192185486,0.7181262978,0.717032275,0.715936483,0.7148389245,0.7137396023,0.7126385189,0.7115356772,0.7104310798,0.7093247296,0.7082166291,0.7071067812,0.7059951886,0.7048818539,0.7037667801,0.7026499698,0.7015314258,0.7004111508,0.6992891476,0.698165419,0.6970399677,0.6959127966,0.6947839084,0.6936533058,0.6925209917,0.691386969,0.6902512402,0.6891138084,0.6879746762,0.6868338465,0.6856913222,0.6845471059,0.6834012006,0.6822536091,0.6811043342,0.6799533787,0.6788007455,0.6776464375,0.6764904574,0.6753328081,0.6741734925,0.6730125135,0.6718498739,0.6706855765,0.6695196243,0.6683520202,0.6671827669,0.6660118674,0.6648393246,0.6636651414,0.6624893207,0.6613118653,0.6601327782,0.6589520623,0.6577697205,0.6565857558,0.6554001709,0.6542129689,0.6530241528,0.6518337253,0.6506416895,0.6494480483,0.6482528047,0.6470559616,0.6458575219,0.6446574886,0.6434558647,0.6422526532,0.6410478569,0.639841479,0.6386335222,0.6374239897,0.6362128845,0.6350002094,0.6337859676,0.6325701619,0.6313527954,0.6301338712,0.6289133921,0.6276913613,0.6264677817,0.6252426563,0.6240159883,0.6227877805,0.621558036,0.620326758,0.6190939493,0.6178596131,0.6166237524,0.6153863702,0.6141474696,0.6129070537,0.6116651254,0.610421688,0.6091767444,0.6079302977,0.606682351,0.6054329074,0.6041819699,0.6029295417,0.6016756258,0.6004202253,0.5991633434,0.5979049831,0.5966451475,0.5953838397,0.5941210629,0.5928568202,0.5915911146,0.5903239494,0.5890553275,0.5877852523,0.5865137267,0.585240754,0.5839663373,0.5826904797,0.5814131843,0.5801344544,0.578854293,0.5775727034,0.5762896887,0.575005252,0.5737193966,0.5724321256,0.5711434422,0.5698533495,0.5685618507,0.5672689491,0.5659746478,0.5646789501,0.563381859,0.5620833779,0.5607835098,0.5594822581,0.5581796259,0.5568756165,0.555570233,0.5542634787,0.5529553569,0.5516458706,0.5503350233,0.549022818,0.5477092581,0.5463943467,0.5450780872,0.5437604828,0.5424415367,0.5411212521,0.5397996324,0.5384766808,0.5371524006,0.535826795,0.5344998673,0.5331716207,0.5318420587,0.5305111843,0.529179001,0.5278455119,0.5265107205,0.52517463,0.5238372436,0.5224985647,0.5211585966,0.5198173426,0.518474806,0.5171309901,0.5157858983,0.5144395338,0.5130918999,0.5117430001,0.5103928376,0.5090414158,0.5076887379,0.5063348074,0.5049796275,0.5036232016,0.5022655331,0.5009066254,0.4995464816,0.4981851053,0.4968224998,0.4954586684,0.4940936146,0.4927273415,0.4913598528,0.4899911516,0.4886212415,0.4872501257,0.4858778077,0.4845042908,0.4831295785,0.4817536741,0.480376581,0.4789983026,0.4776188424,0.4762382037,0.4748563899,0.4734734044,0.4720892507,0.4707039322,0.4693174522,0.4679298143,0.4665410217,0.4651510781,0.4637599867,0.462367751,0.4609743745,0.4595798606,0.4581842127,0.4567874343,0.4553895289,0.4539904997,0.4525903505,0.4511890844,0.4497867052,0.4483832161,0.4469786207,0.4455729224,0.4441661247,0.442758231,0.4413492449,0.4399391699,0.4385280093,0.4371157667,0.4357024455,0.4342880493,0.4328725815,0.4314560457,0.4300384453,0.4286197838,0.4272000647,0.4257792916,0.4243574679,0.4229345971,0.4215106828,0.4200857284,0.4186597375,0.4172327137,0.4158046603,0.414375581,0.4129454793,0.4115143586,0.4100822226,0.4086490747,0.4072149186,0.4057797577,0.4043435955,0.4029064357,0.4014682818,0.4000291372,0.3985890057,0.3971478906,0.3957057957,0.3942627243,0.3928186802,0.3913736668,0.3899276878,0.3884807466,0.3870328469,0.3855839923,0.3841341862,0.3826834324,0.3812317343,0.3797790955,0.3783255197,0.3768710104,0.3754155712,0.3739592057,0.3725019175,0.3710437102,0.3695845874,0.3681245527,0.3666636096,0.3652017619,0.363739013,0.3622753667,0.3608108265,0.359345396,0.3578790789,0.3564118787,0.3549437991,0.3534748438,0.3520050163,0.3505343202,0.3490627592,0.347590337,0.3461170571,0.3446429232,0.3431679389,0.3416921079,0.3402154338,0.3387379202,0.3372595709,0.3357803894,0.3343003794,0.3328195445,0.3313378885,0.3298554149,0.3283721274,0.3268880297,0.3254031254,0.3239174182,0.3224309118,0.3209436098,0.3194555159,0.3179666338,0.3164769672,0.3149865197,0.3134952949,0.3120032967,0.3105105286,0.3090169944,0.3075226977,0.3060276422,0.3045318316,0.3030352696,0.3015379599,0.3000399062,0.2985411122,0.2970415816,0.295541318,0.2940403252,0.2925386069,0.2910361668,0.2895330086,0.288029136,0.2865245527,0.2850192625,0.283513269,0.2820065759,0.280499187,0.278991106,0.2774823367,0.2759728826,0.2744627477,0.2729519355,0.2714404499,0.2699282945,0.268415473,0.2669019893,0.2653878471,0.26387305,0.2623576018,0.2608415063,0.2593247672,0.2578073882,0.2562893731,0.2547707257,0.2532514496,0.2517315487,0.2502110266,0.2486898872,0.2471681341,0.2456457712,0.2441228022,0.2425992308,0.2410750608,0.239550296,0.2380249402,0.236498997,0.2349724703,0.2334453639,0.2319176814,0.2303894267,0.2288606035,0.2273312156,0.2258012669,0.2242707609,0.2227397017,0.2212080928,0.2196759381,0.2181432414,0.2166100064,0.215076237,0.2135419369,0.2120071099,0.2104717598,0.2089358904,0.2073995055,0.2058626088,0.2043252041,0.2027872954,0.2012488862,0.1997099805,0.198170582,0.1966306946,0.195090322,0.1935494681,0.1920081365,0.1904663312,0.188924056,0.1873813146,0.1858381108,0.1842944486,0.1827503316,0.1812057636,0.1796607486,0.1781152903,0.1765693925,0.175023059,0.1734762936,0.1719291003,0.1703814827,0.1688334447,0.1672849901,0.1657361228,0.1641868466,0.1626371652,0.1610870825,0.1595366024,0.1579857286,0.156434465,0.1548828155,0.1533307837,0.1517783737,0.1502255891,0.1486724339,0.1471189118,0.1455650268,0.1440107826,0.142456183,0.1409012319,0.1393459332,0.1377902907,0.1362343082,0.1346779895,0.1331213385,0.1315643591,0.130007055,0.1284494302,0.1268914884,0.1253332336,0.1237746695,0.1222157999,0.1206566289,0.1190971601,0.1175373975,0.1159773448,0.114417006,0.1128563849,0.1112954853,0.1097343111,0.1081728661,0.1066111543,0.1050491794,0.1034869453,0.1019244558,0.1003617149,0.09879872627,0.09723549392,0.09567202165,0.09410831332,0.09254437278,0.0909802039,0.08941581054,0.08785119655,0.0862863658,0.08472132214,0.08315606944,0.08159061157,0.08002495237,0.07845909573,0.07689304549,0.07532680553,0.0737603797,0.07219377188,0.07062698593,0.06906002571,0.0674928951,0.06592559795,0.06435813814,0.06279051953,0.06122274599,0.05965482139,0.0580867496,0.05651853448,0.05495017991,0.05338168976,0.05181306789,0.05024431818,0.0486754445,0.04710645071,0.04553734069,0.04396811832,0.04239878746,0.04082935198,0.03925981576,0.03769018267,0.03612045658,0.03455064137,0.03298074091,0.03141075908,0.02984069974,0.02827056677,0.02670036405,0.02513009544,0.02355976483,0.02198937609,0.02041893309,0.01884843972,0.01727789983,0.01570731731,0.01413669604,0.01256603988,0.01099535272,0.009424638433,0.007853900889,0.006283143966,0.004712371539,0.003141587486,0.001570795681,0,-0.001570795681,-0.003141587486,-0.004712371539,-0.006283143966,-0.007853900889,-0.009424638433,-0.01099535272,-0.01256603988,-0.01413669604,-0.01570731731,-0.01727789983,-0.01884843972,-0.02041893309,-0.02198937609,-0.02355976483,-0.02513009544,-0.02670036405,-0.02827056677,-0.02984069974,-0.03141075908,-0.03298074091,-0.03455064137,-0.03612045658,-0.03769018267,-0.03925981576,-0.04082935198,-0.04239878746,-0.04396811832,-0.04553734069,-0.04710645071,-0.0486754445,-0.05024431818,-0.05181306789,-0.05338168976,-0.05495017991,-0.05651853448,-0.0580867496,-0.05965482139,-0.06122274599,-0.06279051953,-0.06435813814,-0.06592559795,-0.0674928951,-0.06906002571,-0.07062698593,-0.07219377188,-0.0737603797,-0.07532680553,-0.07689304549,-0.07845909573,-0.08002495237,-0.08159061157,-0.08315606944,-0.08472132214,-0.0862863658,-0.08785119655,-0.08941581054,-0.0909802039,-0.09254437278,-0.09410831332,-0.09567202165,-0.09723549392,-0.09879872627,-0.1003617149,-0.1019244558,-0.1034869453,-0.1050491794,-0.1066111543,-0.1081728661,-0.1097343111,-0.1112954853,-0.1128563849,-0.114417006,-0.1159773448,-0.1175373975,-0.1190971601,-0.1206566289,-0.1222157999,-0.1237746695,-0.1253332336,-0.1268914884,-0.1284494302,-0.130007055,-0.1315643591,-0.1331213385,-0.1346779895,-0.1362343082,-0.1377902907,-0.1393459332,-0.1409012319,-0.142456183,-0.1440107826,-0.1455650268,-0.1471189118,-0.1486724339,-0.1502255891,-0.1517783737,-0.1533307837,-0.1548828155,-0.156434465,-0.1579857286,-0.1595366024,-0.1610870825,-0.1626371652,-0.1641868466,-0.1657361228,-0.1672849901,-0.1688334447,-0.1703814827,-0.1719291003,-0.1734762936,-0.175023059,-0.1765693925,-0.1781152903,-0.1796607486,-0.1812057636,-0.1827503316,-0.1842944486,-0.1858381108,-0.1873813146,-0.188924056,-0.1904663312,-0.1920081365,-0.1935494681,-0.195090322,-0.1966306946,-0.198170582,-0.1997099805,-0.2012488862,-0.2027872954,-0.2043252041,-0.2058626088,-0.2073995055,-0.2089358904,-0.2104717598,-0.2120071099,-0.2135419369,-0.215076237,-0.2166100064,-0.2181432414,-0.2196759381,-0.2212080928,-0.2227397017,-0.2242707609,-0.2258012669,-0.2273312156,-0.2288606035,-0.2303894267,-0.2319176814,-0.2334453639,-0.2349724703,-0.236498997,-0.2380249402,-0.239550296,-0.2410750608,-0.2425992308,-0.2441228022,-0.2456457712,-0.2471681341,-0.2486898872,-0.2502110266,-0.2517315487,-0.2532514496,-0.2547707257,-0.2562893731,-0.2578073882,-0.2593247672,-0.2608415063,-0.2623576018,-0.26387305,-0.2653878471,-0.2669019893,-0.268415473,-0.2699282945,-0.2714404499,-0.2729519355,-0.2744627477,-0.2759728826,-0.2774823367,-0.278991106,-0.280499187,-0.2820065759,-0.283513269,-0.2850192625,-0.2865245527,-0.288029136,-0.2895330086,-0.2910361668,-0.2925386069,-0.2940403252,-0.295541318,-0.2970415816,-0.2985411122,-0.3000399062,-0.3015379599,-0.3030352696,-0.3045318316,-0.3060276422,-0.3075226977,-0.3090169944,-0.3105105286,-0.3120032967,-0.3134952949,-0.3149865197,-0.3164769672,-0.3179666338,-0.3194555159,-0.3209436098,-0.3224309118,-0.3239174182,-0.3254031254,-0.3268880297,-0.3283721274,-0.3298554149,-0.3313378885,-0.3328195445,-0.3343003794,-0.3357803894,-0.3372595709,-0.3387379202,-0.3402154338,-0.3416921079,-0.3431679389,-0.3446429232,-0.3461170571,-0.347590337,-0.3490627592,-0.3505343202,-0.3520050163,-0.3534748438,-0.3549437991,-0.3564118787,-0.3578790789,-0.359345396,-0.3608108265,-0.3622753667,-0.363739013,-0.3652017619,-0.3666636096,-0.3681245527,-0.3695845874,-0.3710437102,-0.3725019175,-0.3739592057,-0.3754155712,-0.3768710104,-0.3783255197,-0.3797790955,-0.3812317343,-0.3826834324,-0.3841341862,-0.3855839923,-0.3870328469,-0.3884807466,-0.3899276878,-0.3913736668,-0.3928186802,-0.3942627243,-0.3957057957,-0.3971478906,-0.3985890057,-0.4000291372,-0.4014682818,-0.4029064357,-0.4043435955,-0.4057797577,-0.4072149186,-0.4086490747,-0.4100822226,-0.4115143586,-0.4129454793,-0.414375581,-0.4158046603,-0.4172327137,-0.4186597375,-0.4200857284,-0.4215106828,-0.4229345971,-0.4243574679,-0.4257792916,-0.4272000647,-0.4286197838,-0.4300384453,-0.4314560457,-0.4328725815,-0.4342880493,-0.4357024455,-0.4371157667,-0.4385280093,-0.4399391699,-0.4413492449,-0.442758231,-0.4441661247,-0.4455729224,-0.4469786207,-0.4483832161,-0.4497867052,-0.4511890844,-0.4525903505,-0.4539904997,-0.4553895289,-0.4567874343,-0.4581842127,-0.4595798606,-0.4609743745,-0.462367751,-0.4637599867,-0.4651510781,-0.4665410217,-0.4679298143,-0.4693174522,-0.4707039322,-0.4720892507,-0.4734734044,-0.4748563899,-0.4762382037,-0.4776188424,-0.4789983026,-0.480376581,-0.4817536741,-0.4831295785,-0.4845042908,-0.4858778077,-0.4872501257,-0.4886212415,-0.4899911516,-0.4913598528,-0.4927273415,-0.4940936146,-0.4954586684,-0.4968224998,-0.4981851053,-0.4995464816,-0.5009066254,-0.5022655331,-0.5036232016,-0.5049796275,-0.5063348074,-0.5076887379,-0.5090414158,-0.5103928376,-0.5117430001,-0.5130918999,-0.5144395338,-0.5157858983,-0.5171309901,-0.518474806,-0.5198173426,-0.5211585966,-0.5224985647,-0.5238372436,-0.52517463,-0.5265107205,-0.5278455119,-0.529179001,-0.5305111843,-0.5318420587,-0.5331716207,-0.5344998673,-0.535826795,-0.5371524006,-0.5384766808,-0.5397996324,-0.5411212521,-0.5424415367,-0.5437604828,-0.5450780872,-0.5463943467,-0.5477092581,-0.549022818,-0.5503350233,-0.5516458706,-0.5529553569,-0.5542634787,-0.555570233,-0.5568756165,-0.5581796259,-0.5594822581,-0.5607835098,-0.5620833779,-0.563381859,-0.5646789501,-0.5659746478,-0.5672689491,-0.5685618507,-0.5698533495,-0.5711434422,-0.5724321256,-0.5737193966,-0.575005252,-0.5762896887,-0.5775727034,-0.578854293,-0.5801344544,-0.5814131843,-0.5826904797,-0.5839663373,-0.585240754,-0.5865137267,-0.5877852523,-0.5890553275,-0.5903239494,-0.5915911146,-0.5928568202,-0.5941210629,-0.5953838397,-0.5966451475,-0.5979049831,-0.5991633434,-0.6004202253,-0.6016756258,-0.6029295417,-0.6041819699,-0.6054329074,-0.606682351,-0.6079302977,-0.6091767444,-0.610421688,-0.6116651254,-0.6129070537,-0.6141474696,-0.6153863702,-0.6166237524,-0.6178596131,-0.6190939493,-0.620326758,-0.621558036,-0.6227877805,-0.6240159883,-0.6252426563,-0.6264677817,-0.6276913613,-0.6289133921,-0.6301338712,-0.6313527954,-0.6325701619,-0.6337859676,-0.6350002094,-0.6362128845,-0.6374239897,-0.6386335222,-0.639841479,-0.6410478569,-0.6422526532,-0.6434558647,-0.6446574886,-0.6458575219,-0.6470559616,-0.6482528047,-0.6494480483,-0.6506416895,-0.6518337253,-0.6530241528,-0.6542129689,-0.6554001709,-0.6565857558,-0.6577697205,-0.6589520623,-0.6601327782,-0.6613118653,-0.6624893207,-0.6636651414,-0.6648393246,-0.6660118674,-0.6671827669,-0.6683520202,-0.6695196243,-0.6706855765,-0.6718498739,-0.6730125135,-0.6741734925,-0.6753328081,-0.6764904574,-0.6776464375,-0.6788007455,-0.6799533787,-0.6811043342,-0.6822536091,-0.6834012006,-0.6845471059,-0.6856913222,-0.6868338465,-0.6879746762,-0.6891138084,-0.6902512402,-0.691386969,-0.6925209917,-0.6936533058,-0.6947839084,-0.6959127966,-0.6970399677,-0.698165419,-0.6992891476,-0.7004111508,-0.7015314258,-0.7026499698,-0.7037667801,-0.7048818539,-0.7059951886,-0.7071067812,-0.7082166291,-0.7093247296,-0.7104310798,-0.7115356772,-0.7126385189,-0.7137396023,-0.7148389245,-0.715936483,-0.717032275,-0.7181262978,-0.7192185486,-0.7203090249,-0.7213977239,-0.7224846429,-0.7235697792,-0.7246531302,-0.7257346932,-0.7268144655,-0.7278924445,-0.7289686274,-0.7300430117,-0.7311155947,-0.7321863738,-0.7332553462,-0.7343225094,-0.7353878608,-0.7364513976,-0.7375131174,-0.7385730173,-0.739631095,-0.7406873476,-0.7417417727,-0.7427943677,-0.7438451298,-0.7448940566,-0.7459411454,-0.7469863937,-0.7480297989,-0.7490713584,-0.7501110696,-0.75114893,-0.7521849371,-0.7532190881,-0.7542513807,-0.7552818123,-0.7563103803,-0.7573370821,-0.7583619153,-0.7593848773,-0.7604059656,-0.7614251777,-0.762442511,-0.7634579631,-0.7644715314,-0.7654832135,-0.7664930068,-0.7675009089,-0.7685069172,-0.7695110293,-0.7705132428,-0.771513555,-0.7725119637,-0.7735084662,-0.7745030602,-0.7754957432,-0.7764865127,-0.7774753663,-0.7784623016,-0.7794473161,-0.7804304073,-0.781411573,-0.7823908106,-0.7833681177,-0.7843434919,-0.7853169309,-0.7862884321,-0.7872579933,-0.788225612,-0.7891912858,-0.7901550124,-0.7911167893,-0.7920766142,-0.7930344848,-0.7939903986,-0.7949443534,-0.7958963467,-0.7968463762,-0.7977944395,-0.7987405344,-0.7996846585,-0.8006268094,-0.8015669849,-0.8025051825,-0.8034414001,-0.8043756353,-0.8053078857,-0.8062381491,-0.8071664232,-0.8080927058,-0.8090169944,-0.8099392868,-0.8108595808,-0.8117778741,-0.8126941644,-0.8136084495,-0.8145207271,-0.8154309949,-0.8163392507,-0.8172454923,-0.8181497174,-0.8190519238,-0.8199521093,-0.8208502717,-0.8217464086,-0.822640518,-0.8235325976,-0.8244226453,-0.8253106587,-0.8261966358,-0.8270805743,-0.827962472,-0.8288423269,-0.8297201367,-0.8305958992,-0.8314696123,-0.8323412738,-0.8332108817,-0.8340784336,-0.8349439276,-0.8358073614,-0.8366687329,-0.83752804,-0.8383852807,-0.8392404527,-0.8400935539,-0.8409445823,-0.8417935358,-0.8426404122,-0.8434852094,-0.8443279255,-0.8451685583,-0.8460071057,-0.8468435656,-0.8476779361,-0.848510215,-0.8493404003,-0.8501684899,-0.8509944818,-0.851818374,-0.8526401644,-0.8534598509,-0.8542774317,-0.8550929046,-0.8559062677,-0.8567175189,-0.8575266562,-0.8583336777,-0.8591385813,-0.859941365,-0.860742027,-0.8615405652,-0.8623369776,-0.8631312622,-0.8639234172,-0.8647134405,-0.8655013303,-0.8662870844,-0.8670707012,-0.8678521785,-0.8686315144,-0.8694087071,-0.8701837547,-0.8709566551,-0.8717274065,-0.8724960071,-0.8732624548,-0.8740267479,-0.8747888843,-0.8755488624,-0.87630668,-0.8770623355,-0.877815827,-0.8785671525,-0.8793163102,-0.8800632983,-0.8808081149,-0.8815507582,-0.8822912264,-0.8830295177,-0.8837656301,-0.8844995619,-0.8852313113,-0.8859608765,-0.8866882557,-0.8874134471,-0.8881364488,-0.8888572592,-0.8895758764,-0.8902922986,-0.8910065242,-0.8917185513,-0.8924283781,-0.893136003,-0.8938414242,-0.8945446398,-0.8952456483,-0.8959444479,-0.8966410368,-0.8973354133,-0.8980275758,-0.8987175224,-0.8994052516,-0.9000907615,-0.9007740506,-0.9014551171,-0.9021339594,-0.9028105757,-0.9034849644,-0.9041571239,-0.9048270525,-0.9054947485,-0.9061602102,-0.9068234361,-0.9074844245,-0.9081431738,-0.9087996824,-0.9094539485,-0.9101059707,-0.9107557473,-0.9114032766,-0.9120485572,-0.9126915874,-0.9133323656,-0.9139708903,-0.9146071598,-0.9152411726,-0.9158729272,-0.9165024219,-0.9171296553,-0.9177546257,-0.9183773316,-0.9189977716,-0.919615944,-0.9202318474,-0.9208454801,-0.9214568408,-0.9220659279,-0.9226727399,-0.9232772752,-0.9238795325,-0.9244795102,-0.9250772068,-0.9256726209,-0.926265751,-0.9268565956,-0.9274451533,-0.9280314227,-0.9286154021,-0.9291970904,-0.9297764859,-0.9303535873,-0.9309283931,-0.931500902,-0.9320711125,-0.9326390231,-0.9332046326,-0.9337679395,-0.9343289425,-0.93488764,-0.9354440308,-0.9359981135,-0.9365498867,-0.9370993491,-0.9376464993,-0.9381913359,-0.9387338577,-0.9392740632,-0.9398119511,-0.9403475201,-0.940880769,-0.9414116963,-0.9419403007,-0.942466581,-0.9429905359,-0.943512164,-0.9440314641,-0.944548435,-0.9450630752,-0.9455753836,-0.9460853588,-0.9465929997,-0.947098305,-0.9476012734,-0.9481019037,-0.9486001946,-0.949096145,-0.9495897536,-0.9500810191,-0.9505699404,-0.9510565163,-0.9515407455,-0.9520226269,-0.9525021593,-0.9529793415,-0.9534541723,-0.9539266506,-0.9543967751,-0.9548645447,-0.9553299584,-0.9557930148,-0.9562537129,-0.9567120516,-0.9571680296,-0.957621646,-0.9580728995,-0.958521789,-0.9589683135,-0.9594124719,-0.9598542629,-0.9602936857,-0.960730739,-0.9611654218,-0.961597733,-0.9620276716,-0.9624552365,-0.9628804266,-0.9633032409,-0.9637236783,-0.9641417378,-0.9645574185,-0.9649707191,-0.9653816388,-0.9657901766,-0.9661963313,-0.966600102,-0.9670014878,-0.9674004875,-0.9677971003,-0.9681913252,-0.9685831611,-0.9689726072,-0.9693596624,-0.9697443258,-0.9701265965,-0.9705064735,-0.9708839558,-0.9712590426,-0.9716317329,-0.9720020258,-0.9723699204,-0.9727354158,-0.973098511,-0.9734592052,-0.9738174975,-0.974173387,-0.9745268728,-0.9748779541,-0.9752266299,-0.9755728995,-0.9759167619,-0.9762582164,-0.9765972621,-0.9769338981,-0.9772681236,-0.9775999378,-0.9779293398,-0.978256329,-0.9785809043,-0.9789030651,-0.9792228106,-0.97954014,-0.9798550524,-0.9801675471,-0.9804776234,-0.9807852804,-0.9810905174,-0.9813933337,-0.9816937285,-0.9819917011,-0.9822872507,-0.9825803766,-0.9828710781,-0.9831593545,-0.983445205,-0.9837286289,-0.9840096257,-0.9842881944,-0.9845643345,-0.9848380453,-0.9851093262,-0.9853781763,-0.9856445951,-0.985908582,-0.9861701362,-0.9864292572,-0.9866859442,-0.9869401967,-0.987192014,-0.9874413955,-0.9876883406,-0.9879328487,-0.9881749191,-0.9884145513,-0.9886517447,-0.9888864987,-0.9891188128,-0.9893486862,-0.9895761186,-0.9898011093,-0.9900236577,-0.9902437634,-0.9904614257,-0.9906766442,-0.9908894182,-0.9910997474,-0.9913076311,-0.9915130688,-0.9917160601,-0.9919166044,-0.9921147013,-0.9923103502,-0.9925035507,-0.9926943023,-0.9928826046,-0.993068457,-0.993251859,-0.9934328104,-0.9936113105,-0.993787359,-0.9939609555,-0.9941320994,-0.9943007904,-0.9944670281,-0.994630812,-0.9947921418,-0.994951017,-0.9951074373,-0.9952614022,-0.9954129114,-0.9955619646,-0.9957085613,-0.9958527012,-0.9959943839,-0.9961336091,-0.9962703765,-0.9964046856,-0.9965365363,-0.996665928,-0.9967928606,-0.9969173337,-0.997039347,-0.9971589003,-0.9972759931,-0.9973906252,-0.9975027964,-0.9976125064,-0.9977197548,-0.9978245415,-0.9979268661,-0.9980267284,-0.9981241282,-0.9982190653,-0.9983115393,-0.9984015501,-0.9984890975,-0.9985741811,-0.9986568009,-0.9987369566,-0.998814648,-0.998889875,-0.9989626372,-0.9990329347,-0.9991007671,-0.9991661343,-0.9992290362,-0.9992894726,-0.9993474434,-0.9994029484,-0.9994559874,-0.9995065604,-0.9995546672,-0.9996003077,-0.9996434817,-0.9996841893,-0.9997224302,-0.9997582044,-0.9997915119,-0.9998223524,-0.9998507259,-0.9998766325,-0.9999000719,-0.9999210442,-0.9999395493,-0.9999555871,-0.9999691576,-0.9999802609,-0.9999888967,-0.9999950652,-0.9999987663,-1,-0.9999987663,-0.9999950652,-0.9999888967,-0.9999802609,-0.9999691576,-0.9999555871,-0.9999395493,-0.9999210442,-0.9999000719,-0.9998766325,-0.9998507259,-0.9998223524,-0.9997915119,-0.9997582044,-0.9997224302,-0.9996841893,-0.9996434817,-0.9996003077,-0.9995546672,-0.9995065604,-0.9994559874,-0.9994029484,-0.9993474434,-0.9992894726,-0.9992290362,-0.9991661343,-0.9991007671,-0.9990329347,-0.9989626372,-0.998889875,-0.998814648,-0.9987369566,-0.9986568009,-0.9985741811,-0.9984890975,-0.9984015501,-0.9983115393,-0.9982190653,-0.9981241282,-0.9980267284,-0.9979268661,-0.9978245415,-0.9977197548,-0.9976125064,-0.9975027964,-0.9973906252,-0.9972759931,-0.9971589003,-0.997039347,-0.9969173337,-0.9967928606,-0.996665928,-0.9965365363,-0.9964046856,-0.9962703765,-0.9961336091,-0.9959943839,-0.9958527012,-0.9957085613,-0.9955619646,-0.9954129114,-0.9952614022,-0.9951074373,-0.994951017,-0.9947921418,-0.994630812,-0.9944670281,-0.9943007904,-0.9941320994,-0.9939609555,-0.993787359,-0.9936113105,-0.9934328104,-0.993251859,-0.993068457,-0.9928826046,-0.9926943023,-0.9925035507,-0.9923103502,-0.9921147013,-0.9919166044,-0.9917160601,-0.9915130688,-0.9913076311,-0.9910997474,-0.9908894182,-0.9906766442,-0.9904614257,-0.9902437634,-0.9900236577,-0.9898011093,-0.9895761186,-0.9893486862,-0.9891188128,-0.9888864987,-0.9886517447,-0.9884145513,-0.9881749191,-0.9879328487,-0.9876883406,-0.9874413955,-0.987192014,-0.9869401967,-0.9866859442,-0.9864292572,-0.9861701362,-0.985908582,-0.9856445951,-0.9853781763,-0.9851093262,-0.9848380453,-0.9845643345,-0.9842881944,-0.9840096257,-0.9837286289,-0.983445205,-0.9831593545,-0.9828710781,-0.9825803766,-0.9822872507,-0.9819917011,-0.9816937285,-0.9813933337,-0.9810905174,-0.9807852804,-0.9804776234,-0.9801675471,-0.9798550524,-0.97954014,-0.9792228106,-0.9789030651,-0.9785809043,-0.978256329,-0.9779293398,-0.9775999378,-0.9772681236,-0.9769338981,-0.9765972621,-0.9762582164,-0.9759167619,-0.9755728995,-0.9752266299,-0.9748779541,-0.9745268728,-0.974173387,-0.9738174975,-0.9734592052,-0.973098511,-0.9727354158,-0.9723699204,-0.9720020258,-0.9716317329,-0.9712590426,-0.9708839558,-0.9705064735,-0.9701265965,-0.9697443258,-0.9693596624,-0.9689726072,-0.9685831611,-0.9681913252,-0.9677971003,-0.9674004875,-0.9670014878,-0.966600102,-0.9661963313,-0.9657901766,-0.9653816388,-0.9649707191,-0.9645574185,-0.9641417378,-0.9637236783,-0.9633032409,-0.9628804266,-0.9624552365,-0.9620276716,-0.961597733,-0.9611654218,-0.960730739,-0.9602936857,-0.9598542629,-0.9594124719,-0.9589683135,-0.958521789,-0.9580728995,-0.957621646,-0.9571680296,-0.9567120516,-0.9562537129,-0.9557930148,-0.9553299584,-0.9548645447,-0.9543967751,-0.9539266506,-0.9534541723,-0.9529793415,-0.9525021593,-0.9520226269,-0.9515407455,-0.9510565163,-0.9505699404,-0.9500810191,-0.9495897536,-0.949096145,-0.9486001946,-0.9481019037,-0.9476012734,-0.947098305,-0.9465929997,-0.9460853588,-0.9455753836,-0.9450630752,-0.944548435,-0.9440314641,-0.943512164,-0.9429905359,-0.942466581,-0.9419403007,-0.9414116963,-0.940880769,-0.9403475201,-0.9398119511,-0.9392740632,-0.9387338577,-0.9381913359,-0.9376464993,-0.9370993491,-0.9365498867,-0.9359981135,-0.9354440308,-0.93488764,-0.9343289425,-0.9337679395,-0.9332046326,-0.9326390231,-0.9320711125,-0.931500902,-0.9309283931,-0.9303535873,-0.9297764859,-0.9291970904,-0.9286154021,-0.9280314227,-0.9274451533,-0.9268565956,-0.926265751,-0.9256726209,-0.9250772068,-0.9244795102,-0.9238795325,-0.9232772752,-0.9226727399,-0.9220659279,-0.9214568408,-0.9208454801,-0.9202318474,-0.919615944,-0.9189977716,-0.9183773316,-0.9177546257,-0.9171296553,-0.9165024219,-0.9158729272,-0.9152411726,-0.9146071598,-0.9139708903,-0.9133323656,-0.9126915874,-0.9120485572,-0.9114032766,-0.9107557473,-0.9101059707,-0.9094539485,-0.9087996824,-0.9081431738,-0.9074844245,-0.9068234361,-0.9061602102,-0.9054947485,-0.9048270525,-0.9041571239,-0.9034849644,-0.9028105757,-0.9021339594,-0.9014551171,-0.9007740506,-0.9000907615,-0.8994052516,-0.8987175224,-0.8980275758,-0.8973354133,-0.8966410368,-0.8959444479,-0.8952456483,-0.8945446398,-0.8938414242,-0.893136003,-0.8924283781,-0.8917185513,-0.8910065242,-0.8902922986,-0.8895758764,-0.8888572592,-0.8881364488,-0.8874134471,-0.8866882557,-0.8859608765,-0.8852313113,-0.8844995619,-0.8837656301,-0.8830295177,-0.8822912264,-0.8815507582,-0.8808081149,-0.8800632983,-0.8793163102,-0.8785671525,-0.877815827,-0.8770623355,-0.87630668,-0.8755488624,-0.8747888843,-0.8740267479,-0.8732624548,-0.8724960071,-0.8717274065,-0.8709566551,-0.8701837547,-0.8694087071,-0.8686315144,-0.8678521785,-0.8670707012,-0.8662870844,-0.8655013303,-0.8647134405,-0.8639234172,-0.8631312622,-0.8623369776,-0.8615405652,-0.860742027,-0.859941365,-0.8591385813,-0.8583336777,-0.8575266562,-0.8567175189,-0.8559062677,-0.8550929046,-0.8542774317,-0.8534598509,-0.8526401644,-0.851818374,-0.8509944818,-0.8501684899,-0.8493404003,-0.848510215,-0.8476779361,-0.8468435656,-0.8460071057,-0.8451685583,-0.8443279255,-0.8434852094,-0.8426404122,-0.8417935358,-0.8409445823,-0.8400935539,-0.8392404527,-0.8383852807,-0.83752804,-0.8366687329,-0.8358073614,-0.8349439276,-0.8340784336,-0.8332108817,-0.8323412738,-0.8314696123,-0.8305958992,-0.8297201367,-0.8288423269,-0.827962472,-0.8270805743,-0.8261966358,-0.8253106587,-0.8244226453,-0.8235325976,-0.822640518,-0.8217464086,-0.8208502717,-0.8199521093,-0.8190519238,-0.8181497174,-0.8172454923,-0.8163392507,-0.8154309949,-0.8145207271,-0.8136084495,-0.8126941644,-0.8117778741,-0.8108595808,-0.8099392868,-0.8090169944,-0.8080927058,-0.8071664232,-0.8062381491,-0.8053078857,-0.8043756353,-0.8034414001,-0.8025051825,-0.8015669849,-0.8006268094,-0.7996846585,-0.7987405344,-0.7977944395,-0.7968463762,-0.7958963467,-0.7949443534,-0.7939903986,-0.7930344848,-0.7920766142,-0.7911167893,-0.7901550124,-0.7891912858,-0.788225612,-0.7872579933,-0.7862884321,-0.7853169309,-0.7843434919,-0.7833681177,-0.7823908106,-0.781411573,-0.7804304073,-0.7794473161,-0.7784623016,-0.7774753663,-0.7764865127,-0.7754957432,-0.7745030602,-0.7735084662,-0.7725119637,-0.771513555,-0.7705132428,-0.7695110293,-0.7685069172,-0.7675009089,-0.7664930068,-0.7654832135,-0.7644715314,-0.7634579631,-0.762442511,-0.7614251777,-0.7604059656,-0.7593848773,-0.7583619153,-0.7573370821,-0.7563103803,-0.7552818123,-0.7542513807,-0.7532190881,-0.7521849371,-0.75114893,-0.7501110696,-0.7490713584,-0.7480297989,-0.7469863937,-0.7459411454,-0.7448940566,-0.7438451298,-0.7427943677,-0.7417417727,-0.7406873476,-0.739631095,-0.7385730173,-0.7375131174,-0.7364513976,-0.7353878608,-0.7343225094,-0.7332553462,-0.7321863738,-0.7311155947,-0.7300430117,-0.7289686274,-0.7278924445,-0.7268144655,-0.7257346932,-0.7246531302,-0.7235697792,-0.7224846429,-0.7213977239,-0.7203090249,-0.7192185486,-0.7181262978,-0.717032275,-0.715936483,-0.7148389245,-0.7137396023,-0.7126385189,-0.7115356772,-0.7104310798,-0.7093247296,-0.7082166291,-0.7071067812,-0.7059951886,-0.7048818539,-0.7037667801,-0.7026499698,-0.7015314258,-0.7004111508,-0.6992891476,-0.698165419,-0.6970399677,-0.6959127966,-0.6947839084,-0.6936533058,-0.6925209917,-0.691386969,-0.6902512402,-0.6891138084,-0.6879746762,-0.6868338465,-0.6856913222,-0.6845471059,-0.6834012006,-0.6822536091,-0.6811043342,-0.6799533787,-0.6788007455,-0.6776464375,-0.6764904574,-0.6753328081,-0.6741734925,-0.6730125135,-0.6718498739,-0.6706855765,-0.6695196243,-0.6683520202,-0.6671827669,-0.6660118674,-0.6648393246,-0.6636651414,-0.6624893207,-0.6613118653,-0.6601327782,-0.6589520623,-0.6577697205,-0.6565857558,-0.6554001709,-0.6542129689,-0.6530241528,-0.6518337253,-0.6506416895,-0.6494480483,-0.6482528047,-0.6470559616,-0.6458575219,-0.6446574886,-0.6434558647,-0.6422526532,-0.6410478569,-0.639841479,-0.6386335222,-0.6374239897,-0.6362128845,-0.6350002094,-0.6337859676,-0.6325701619,-0.6313527954,-0.6301338712,-0.6289133921,-0.6276913613,-0.6264677817,-0.6252426563,-0.6240159883,-0.6227877805,-0.621558036,-0.620326758,-0.6190939493,-0.6178596131,-0.6166237524,-0.6153863702,-0.6141474696,-0.6129070537,-0.6116651254,-0.610421688,-0.6091767444,-0.6079302977,-0.606682351,-0.6054329074,-0.6041819699,-0.6029295417,-0.6016756258,-0.6004202253,-0.5991633434,-0.5979049831,-0.5966451475,-0.5953838397,-0.5941210629,-0.5928568202,-0.5915911146,-0.5903239494,-0.5890553275,-0.5877852523,-0.5865137267,-0.585240754,-0.5839663373,-0.5826904797,-0.5814131843,-0.5801344544,-0.578854293,-0.5775727034,-0.5762896887,-0.575005252,-0.5737193966,-0.5724321256,-0.5711434422,-0.5698533495,-0.5685618507,-0.5672689491,-0.5659746478,-0.5646789501,-0.563381859,-0.5620833779,-0.5607835098,-0.5594822581,-0.5581796259,-0.5568756165,-0.555570233,-0.5542634787,-0.5529553569,-0.5516458706,-0.5503350233,-0.549022818,-0.5477092581,-0.5463943467,-0.5450780872,-0.5437604828,-0.5424415367,-0.5411212521,-0.5397996324,-0.5384766808,-0.5371524006,-0.535826795,-0.5344998673,-0.5331716207,-0.5318420587,-0.5305111843,-0.529179001,-0.5278455119,-0.5265107205,-0.52517463,-0.5238372436,-0.5224985647,-0.5211585966,-0.5198173426,-0.518474806,-0.5171309901,-0.5157858983,-0.5144395338,-0.5130918999,-0.5117430001,-0.5103928376,-0.5090414158,-0.5076887379,-0.5063348074,-0.5049796275,-0.5036232016,-0.5022655331,-0.5009066254,-0.4995464816,-0.4981851053,-0.4968224998,-0.4954586684,-0.4940936146,-0.4927273415,-0.4913598528,-0.4899911516,-0.4886212415,-0.4872501257,-0.4858778077,-0.4845042908,-0.4831295785,-0.4817536741,-0.480376581,-0.4789983026,-0.4776188424,-0.4762382037,-0.4748563899,-0.4734734044,-0.4720892507,-0.4707039322,-0.4693174522,-0.4679298143,-0.4665410217,-0.4651510781,-0.4637599867,-0.462367751,-0.4609743745,-0.4595798606,-0.4581842127,-0.4567874343,-0.4553895289,-0.4539904997,-0.4525903505,-0.4511890844,-0.4497867052,-0.4483832161,-0.4469786207,-0.4455729224,-0.4441661247,-0.442758231,-0.4413492449,-0.4399391699,-0.4385280093,-0.4371157667,-0.4357024455,-0.4342880493,-0.4328725815,-0.4314560457,-0.4300384453,-0.4286197838,-0.4272000647,-0.4257792916,-0.4243574679,-0.4229345971,-0.4215106828,-0.4200857284,-0.4186597375,-0.4172327137,-0.4158046603,-0.414375581,-0.4129454793,-0.4115143586,-0.4100822226,-0.4086490747,-0.4072149186,-0.4057797577,-0.4043435955,-0.4029064357,-0.4014682818,-0.4000291372,-0.3985890057,-0.3971478906,-0.3957057957,-0.3942627243,-0.3928186802,-0.3913736668,-0.3899276878,-0.3884807466,-0.3870328469,-0.3855839923,-0.3841341862,-0.3826834324,-0.3812317343,-0.3797790955,-0.3783255197,-0.3768710104,-0.3754155712,-0.3739592057,-0.3725019175,-0.3710437102,-0.3695845874,-0.3681245527,-0.3666636096,-0.3652017619,-0.363739013,-0.3622753667,-0.3608108265,-0.359345396,-0.3578790789,-0.3564118787,-0.3549437991,-0.3534748438,-0.3520050163,-0.3505343202,-0.3490627592,-0.347590337,-0.3461170571,-0.3446429232,-0.3431679389,-0.3416921079,-0.3402154338,-0.3387379202,-0.3372595709,-0.3357803894,-0.3343003794,-0.3328195445,-0.3313378885,-0.3298554149,-0.3283721274,-0.3268880297,-0.3254031254,-0.3239174182,-0.3224309118,-0.3209436098,-0.3194555159,-0.3179666338,-0.3164769672,-0.3149865197,-0.3134952949,-0.3120032967,-0.3105105286,-0.3090169944,-0.3075226977,-0.3060276422,-0.3045318316,-0.3030352696,-0.3015379599,-0.3000399062,-0.2985411122,-0.2970415816,-0.295541318,-0.2940403252,-0.2925386069,-0.2910361668,-0.2895330086,-0.288029136,-0.2865245527,-0.2850192625,-0.283513269,-0.2820065759,-0.280499187,-0.278991106,-0.2774823367,-0.2759728826,-0.2744627477,-0.2729519355,-0.2714404499,-0.2699282945,-0.268415473,-0.2669019893,-0.2653878471,-0.26387305,-0.2623576018,-0.2608415063,-0.2593247672,-0.2578073882,-0.2562893731,-0.2547707257,-0.2532514496,-0.2517315487,-0.2502110266,-0.2486898872,-0.2471681341,-0.2456457712,-0.2441228022,-0.2425992308,-0.2410750608,-0.239550296,-0.2380249402,-0.236498997,-0.2349724703,-0.2334453639,-0.2319176814,-0.2303894267,-0.2288606035,-0.2273312156,-0.2258012669,-0.2242707609,-0.2227397017,-0.2212080928,-0.2196759381,-0.2181432414,-0.2166100064,-0.215076237,-0.2135419369,-0.2120071099,-0.2104717598,-0.2089358904,-0.2073995055,-0.2058626088,-0.2043252041,-0.2027872954,-0.2012488862,-0.1997099805,-0.198170582,-0.1966306946,-0.195090322,-0.1935494681,-0.1920081365,-0.1904663312,-0.188924056,-0.1873813146,-0.1858381108,-0.1842944486,-0.1827503316,-0.1812057636,-0.1796607486,-0.1781152903,-0.1765693925,-0.175023059,-0.1734762936,-0.1719291003,-0.1703814827,-0.1688334447,-0.1672849901,-0.1657361228,-0.1641868466,-0.1626371652,-0.1610870825,-0.1595366024,-0.1579857286,-0.156434465,-0.1548828155,-0.1533307837,-0.1517783737,-0.1502255891,-0.1486724339,-0.1471189118,-0.1455650268,-0.1440107826,-0.142456183,-0.1409012319,-0.1393459332,-0.1377902907,-0.1362343082,-0.1346779895,-0.1331213385,-0.1315643591,-0.130007055,-0.1284494302,-0.1268914884,-0.1253332336,-0.1237746695,-0.1222157999,-0.1206566289,-0.1190971601,-0.1175373975,-0.1159773448,-0.114417006,-0.1128563849,-0.1112954853,-0.1097343111,-0.1081728661,-0.1066111543,-0.1050491794,-0.1034869453,-0.1019244558,-0.1003617149,-0.09879872627,-0.09723549392,-0.09567202165,-0.09410831332,-0.09254437278,-0.0909802039,-0.08941581054,-0.08785119655,-0.0862863658,-0.08472132214,-0.08315606944,-0.08159061157,-0.08002495237,-0.07845909573,-0.07689304549,-0.07532680553,-0.0737603797,-0.07219377188,-0.07062698593,-0.06906002571,-0.0674928951,-0.06592559795,-0.06435813814,-0.06279051953,-0.06122274599,-0.05965482139,-0.0580867496,-0.05651853448,-0.05495017991,-0.05338168976,-0.05181306789,-0.05024431818,-0.0486754445,-0.04710645071,-0.04553734069,-0.04396811832,-0.04239878746,-0.04082935198,-0.03925981576,-0.03769018267,-0.03612045658,-0.03455064137,-0.03298074091,-0.03141075908,-0.02984069974,-0.02827056677,-0.02670036405,-0.02513009544,-0.02355976483,-0.02198937609,-0.02041893309,-0.01884843972,-0.01727789983,-0.01570731731,-0.01413669604,-0.01256603988,-0.01099535272,-0.009424638433,-0.007853900889,-0.006283143966,-0.004712371539,-0.003141587486,-0.001570795681])},
    ]);
    public static chipWaves: DictionaryArray<ChipWave> = rawChipToIntegrated(Config.rawChipWaves);
    public static rawRawChipWaves: DictionaryArray<ChipWave> = Config.rawChipWaves;

    public static firstIndexForSamplesInChipWaveList: number = Config.chipWaves.length;
  
    // Noise waves have too many samples to write by hand, they're generated on-demand by getDrumWave instead.
    public static readonly chipNoises: DictionaryArray<ChipNoise> = toNameMap([
        { name: "retro", expression: 0.25, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "white", expression: 1.0, basePitch: 69, pitchFilterMult: 8.0, isSoft: true, samples: null },
        // The "clang" and "buzz" noises are based on similar noises in the modded beepbox! :D
        { name: "clang", expression: 0.4, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "buzz", expression: 0.3, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "hollow", expression: 1.5, basePitch: 96, pitchFilterMult: 1.0, isSoft: true, samples: null },
        { name: "shine", expression: 1.0, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null }, // Identical to buzz but louder. For now we're keeping it...
        { name: "deep", expression: 1.5, basePitch: 120, pitchFilterMult: 1024.0, isSoft: true, samples: null },
        { name: "cutter", expression: 0.005, basePitch: 96, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "metallic", expression: 1.0, basePitch: 96, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "static", expression: 1.0, basePitch: 96, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        // technically these are from the pandorasbox beta but whatever
        { name: "1-bit white", expression: 0.5, basePitch: 74.41, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "1-bit metallic", expression: 0.5, basePitch: 86.41, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        // ultrabox noises
        { name: "crackling", expression: 0.9, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "pink", expression: 1.0, basePitch: 69, pitchFilterMult: 8.0, isSoft: true, samples: null },
        { name: "brownian", expression: 1.0, basePitch: 69, pitchFilterMult: 8.0, isSoft: true, samples: null },
    ]);
	
    public static readonly filterFreqStep: number = 1.0 / 4.0;
    public static readonly filterFreqRange: number = 34;
    public static readonly filterFreqReferenceSetting: number = 28;
    public static readonly filterFreqReferenceHz: number = 8000.0;
    public static readonly filterFreqMaxHz: number = Config.filterFreqReferenceHz * Math.pow(2.0, Config.filterFreqStep * (Config.filterFreqRange - 1 - Config.filterFreqReferenceSetting)); // ~19khz
    public static readonly filterFreqMinHz: number = 8.0;
    public static readonly filterGainRange: number = 15;
    public static readonly filterGainCenter: number = 7;
    public static readonly filterGainStep: number = 1.0 / 2.0;
    public static readonly filterMaxPoints: number = 34; //froupbox: 12
    public static readonly filterTypeNames: ReadonlyArray<string> = ["low-pass", "high-pass", "peak"]; // See FilterType enum above.
    public static readonly filterMorphCount: number = 20; //froupbox: 10 Number of filter shapes allowed for modulating between. Counts the 0/default position.

    public static readonly filterSimpleCutRange: number = 11;
    public static readonly filterSimplePeakRange: number = 8;

    public static readonly fadeInRange: number = 10;
    public static readonly fadeOutTicks: ReadonlyArray<number> = [-24, -12, -6, -3, -1, 6, 12, 24, 48, 72, 96];
    public static readonly fadeOutNeutral: number = 4;
    public static readonly drumsetFadeOutTicks: number = 48;
    public static readonly transitions: DictionaryArray<Transition> = toNameMap([
        { name: "normal", isSeamless: false, continues: false, slides: false, slideTicks: 3, includeAdjacentPatterns: false },
        { name: "interrupt", isSeamless: true, continues: false, slides: false, slideTicks: 3, includeAdjacentPatterns: true },
        { name: "continue", isSeamless: true, continues: true, slides: false, slideTicks: 3, includeAdjacentPatterns: true },
        { name: "slide", isSeamless: true, continues: false, slides: true, slideTicks: 3, includeAdjacentPatterns: true },
        { name: "slide in pattern", isSeamless: true, continues: false, slides: true, slideTicks: 3, includeAdjacentPatterns: false }
    ]);
    public static readonly vibratos: DictionaryArray<Vibrato> = toNameMap([
        { name: "none", amplitude: 0.0, type: 0, delayTicks: 0 },
        { name: "light", amplitude: 0.15, type: 0, delayTicks: 0 },
        { name: "delayed", amplitude: 0.3, type: 0, delayTicks: 37 }, // It will fade in over the previous two ticks.
        { name: "heavy", amplitude: 0.45, type: 0, delayTicks: 0 },
        { name: "shaky", amplitude: 0.1, type: 1, delayTicks: 0 },
        //    { name: "very shaky", amplitude: 1, type: 0, delayTicks: 0 },
        //{ name: "insane", amplitude: 10, type: 1, delayTicks: 0 },
        //todbox vibratos
        //	{ name: "super insane", amplitude: 30, type: 1, delayTicks: 1 },
        //wackybox
        //	 { name: "quiver", amplitude: 0.001, type: 0, delayTicks: 0 },
        //  { name: "wub-wub", amplitude: 10.0, type: 0, delayTicks: 0 },
        //     { name: "quiver delayed", amplitude: 0.001, type: 0, delayTicks: 18 },
        //  { name: "vibrate", amplitude: 0.08, type: 0, delayTicks: 0 },
        // { name: "too much wub ⚠", amplitude: 30.0, type: 0, delayTicks: 18 },
        //too much wub breaks things just a little bit at it's original amplitude
        //sandbox
    ]);
    public static readonly vibratoTypes: DictionaryArray<VibratoType> = toNameMap([
        { name: "normal", periodsSeconds: [0.14], period: 0.14 },
        { name: "shaky", periodsSeconds: [0.11, 1.618 * 0.11, 3 * 0.11], period: 266.97 }, // LCM of all periods
    ]);
    // This array is more or less a linear step by 0.1 but there's a bit of range added at the start to hit specific ratios, and the end starts to grow faster.
    //                                                             0       1      2    3     4      5    6    7      8     9   10   11 12   13   14   15   16   17   18   19   20   21 22   23   24   25   26   27   28   29   30   31 32   33   34   35   36   37   38    39  40   41 42    43   44   45   46 47   48 49 50
    public static readonly arpSpeedScale: ReadonlyArray<number> = [0, 0.0625, 0.125, 0.2, 0.25, 1 / 3, 0.4, 0.5, 2 / 3, 0.75, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4, 4.15, 4.3, 4.5, 4.8, 5, 5.5, 6, 8];
    public static readonly unisons: DictionaryArray<Unison> = toNameMap([
        { name: "none",             voices: 1, spread: 0.0,      offset:  0.0,    expression: 1.4,   sign:  1.0 },
        { name: "shimmer",          voices: 2, spread: 0.018,    offset:  0.0,    expression: 0.8,   sign:  1.0 },
        { name: "hum",              voices: 2, spread: 0.045,    offset:  0.0,    expression: 1.0,   sign:  1.0 },
        { name: "honky tonk",       voices: 2, spread: 0.09,     offset:  0.0,    expression: 1.0,   sign:  1.0 },
        { name: "dissonant",        voices: 2, spread: 0.25,     offset:  0.0,    expression: 0.9,   sign:  1.0 },

        { name: "piano",            voices: 2, spread: 0.01,     offset:  0.0,    expression: 1.0,   sign:  0.7 },
        { name: "spinner",          voices: 2, spread: 0.02,     offset:  0.0,    expression: 1.0,   sign:  1.0 },
        { name: "recurve",          voices: 2, spread: 0.005,    offset:  0.0,    expression: 1.0,   sign:  1.0 },
        { name: "vary",             voices: 2, spread: 0.002,    offset:  0.0,    expression: 0.85,  sign:  1.6 },

        { name: "bowed",            voices: 2, spread: 0.02,     offset:  0.0,    expression: 1.0,   sign: -1.0 },
        { name: "hold",             voices: 2, spread: 0.003,    offset:  0.0,    expression: 0.8,   sign: -2.5 },

        { name: "chorus",           voices: 9, spread: 0.22,     offset:  0,      expression: 0.15,  sign:  1.0 },
        { name: "bow",              voices: 9, spread: 0.006,    offset:  0,      expression: 0.15,  sign:  0.5 },

        { name: "octave",           voices: 2, spread: 6.0,      offset:  6.0,    expression: 0.8,   sign:  1.0 },
        { name: "double octave",    voices: 3, spread: 12.0,     offset:  0.0,    expression: 0.63,  sign:  1.0 },
        { name: "triple octave",    voices: 4, spread: 18.0,     offset:  6.0,    expression: 0.5,   sign:  1.0 },
        { name: "weird octave",     voices: 2, spread: 5.85,     offset:  5.85,   expression: 0.75,  sign:  1.0 },
        { name: "fluctuate",        voices: 2, spread: 12,       offset:  0.0,    expression: 1.0,   sign:  1.0 },

        { name: "fifth",            voices: 2, spread: 3.5,      offset:  3.5,    expression: 0.9,   sign:  1.0 },
        { name: "alternate fifth",  voices: 2, spread: 2.5,      offset: -2.5,    expression: 0.9,   sign:  1.0 },
        { name: "lone fifth",       voices: 1, spread: 0.0,      offset:  7.0,    expression: 1.4,   sign:  1.0 },

        { name: "fourth",           voices: 2, spread: 4,        offset:  4,      expression: 0.95,  sign:  1.0 },

        { name: "warbled",          voices: 2, spread: 0.25,     offset:  0.05,   expression: 0.9,   sign: -0.8 },
        { name: "hecking gosh",     voices: 2, spread: 6.25,     offset: -6.0,    expression: 0.8,   sign: -0.7 },
        { name: "detune",           voices: 1, spread: 0.0,      offset:  0.25,   expression: 1.0,   sign:  1.0 },
        { name: "rising",           voices: 2, spread: 1.0,      offset:  0.7,    expression: 0.95,  sign:  1.0 },
        { name: "vibrate",          voices: 2, spread: 3.5,      offset:  7,      expression: 0.975, sign:  1.0 },
        { name: "bass",             voices: 1, spread: 0,        offset: -7,      expression: 1.0,   sign:  1.0 },
        { name: "dirty",            voices: 2, spread: 0,        offset:  0.1,    expression: 0.975, sign:  1.0 },
        { name: "stationary",       voices: 2, spread: 3.5,      offset:  0.0,    expression: 0.9,   sign:  1.0 },
        { name: "voiced",           voices: 2, spread: 9.5,      offset:  0.0,    expression: 1.0,   sign:  1.0 },
        { name: "inject",           voices: 2, spread: 6.0,      offset:  0.4,    expression: 1.0,   sign:  1.0 },
        { name: "askewed",          voices: 2, spread: 0.0,      offset:  0.42,   expression: 0.7,   sign:  1.0 },
        { name: "resonance",        voices: 2, spread: 0.0025,   offset:  0.1,    expression: 0.8,   sign: -1.5 },
        { name: "augmented",        voices: 4, spread: 6,        offset:  6,      expression: 0.5,   sign:  1.0 },
        { name: "diminished",       voices: 5, spread: 6,        offset:  6,      expression: 0.4,   sign:  1.0 },
        { name: "block",            voices: 9, spread: 6,        offset:  6,      expression: 0.15,  sign:  0.8 },
        { name: "extraterrestrial", voices: 6, spread: 15.2,     offset: -6,      expression: 0.35,  sign:  0.7 },
        { name: "hyper",            voices: 2, spread: 0.03,     offset: -0.02,   expression: 0.85,  sign:  0.7 },
        { name: "broke",            voices: 2, spread: 0.0,      offset: -0.3,    expression: 0.8,   sign:  1.0 },
        { name: "energetic",        voices: 2, spread: 6.15,     offset:  6.435,  expression: 0.85,  sign:  0.9 },
        { name: "bent",             voices: 2, spread: 9.5,      offset:  4.5,    expression: 0.8,   sign: -0.6 },
        { name: "offtune",          voices: 2, spread: 0.40,     offset:  0.40,   expression: 0.9,   sign:  1.0 },

        { name: "peak",             voices: 2, spread: 12.038,   offset:  12.01,  expression: 0.85,  sign:  0.9 },
        { name: "deep shift",       voices: 2, spread: 12.03,    offset: -17.01,  expression: 0.85,  sign:  1.2 },
        { name: "buried",           voices: 2, spread: 0.036,    offset: -36.0,   expression: 1.4,   sign:  1.0 },
        { name: "corrupt",          voices: 2, spread: 18.0,     offset:  48.0,   expression: 0.7,   sign:  0.7 },
        { name: "thin",             voices: 1, spread: 0.0,      offset:  50.0,   expression: 1.0,   sign:  1.0 },

        { name: "FART",             voices: 2, spread: 13,       offset: -5,      expression: 1.0,   sign: -3   },
        //for modbox; voices = riffapp, spread = intervals, offset = offsets, expression = volume, and sign = signs

        // NOTE: DO NOT ADD MORE (without updating the url version): changing the number of unisons changes the url format and breaks previous versions. search for "number of unisons in the current URL version" in synth.ts for more info
    ]);
    public static readonly unisonCapableInstruments: ReadonlySet<InstrumentType> = new Set([
      InstrumentType.chip,
      InstrumentType.customChipWave,
      InstrumentType.harmonics,
      InstrumentType.pickedString,
      InstrumentType.spectrum,
      InstrumentType.pwm,
      InstrumentType.noise,
      InstrumentType.drumset,
      InstrumentType.fm,
      InstrumentType.fm6op,
      InstrumentType.supersaw,
    ]);
    public static readonly effectNames: ReadonlyArray<string> = ["reverb", "chorus", "panning", "distortion", "bitcrusher", "note filter", "echo", "pitch shift", "detune", "vibrato", "transition type", "chord type", "note range", "ring mod", "granular", "phaser", "", "invert wave", "compressor", "flanger"];
    public static readonly effectOrder: ReadonlyArray<EffectType> = [EffectType.panning, EffectType.transition, EffectType.chord, EffectType.pitchShift, EffectType.detune, EffectType.vibrato, EffectType.noteFilter, EffectType.granular, EffectType.distortion, EffectType.bitcrusher, EffectType.chorus, EffectType.echo, EffectType.reverb, EffectType.ringModulation, EffectType.phaser, EffectType.invertWave, EffectType.compressor, EffectType.noteRange, EffectType.flanger];
    public static readonly noteSizeMax: number = 6;
    public static readonly volumeRange: number = 50;
    // Beepbox's old volume scale used factor -0.5 and was [0~7] had roughly value 6 = 0.125 power. This new value is chosen to have -21 be the same,
    // given that the new scale is [-25~25]. This is such that conversion between the scales is roughly equivalent by satisfying (0.5*6 = 0.1428*21)
    public static readonly volumeLogScale: number = 0.1428;
    public static readonly panCenter: number = 50;
    public static readonly panMax: number = Config.panCenter * 2;
    public static readonly panDelaySecondsMax: number = 0.001;
    public static readonly ringModRange: number = 8;
    public static readonly ringModHzRange: number = 64;
    public static readonly ringModMinHz: number = 20;  
    public static readonly ringModMaxHz: number = 4400;
    public static readonly rmHzOffsetCenter: number = 200;
    public static readonly rmHzOffsetMax: number = 400;
    public static readonly rmHzOffsetMin: number = 0;
    public static readonly granularRange: number = 10;
    public static readonly grainSizeMin: number = 40;
    public static readonly grainSizeMax: number = 2000;
    public static readonly grainSizeStep: number = 40;
    public static readonly grainRangeMax: number = 1600;
    public static readonly grainAmountsMax: number = 10; //2^grainAmountsMax is what is actually used
    public static readonly granularEnvelopeType: number = GranularEnvelopeType.parabolic; //here you can change which envelope implementation is used for grains (RaisedCosineBell still needs work)
    public static readonly chorusRange: number = 8; // slarmoo: 8
    public static readonly chorusPeriodSeconds: number = 2.0;
    public static readonly chorusDelayRange: number = 0.0034;
    public static readonly chorusDelayOffsets: ReadonlyArray<ReadonlyArray<number>> = [[1.51, 2.10, 3.35], [1.47, 2.15, 3.25]];
    public static readonly chorusPhaseOffsets: ReadonlyArray<ReadonlyArray<number>> = [[0.0, 2.1, 4.2], [3.2, 5.3, 1.0]];
    public static readonly chorusMaxDelay: number = Config.chorusDelayRange * (1.0 + Config.chorusDelayOffsets[0].concat(Config.chorusDelayOffsets[1]).reduce((x, y) => Math.max(x, y)));
    public static readonly chords: DictionaryArray<Chord> = toNameMap([
        { name: "simultaneous", customInterval: false, arpeggiates: false, strumParts: 0, singleTone: false },
        { name: "strum", customInterval: false, arpeggiates: false, strumParts: 1, singleTone: false },
        { name: "arpeggio", customInterval: false, arpeggiates: true, strumParts: 0, singleTone: true },
        { name: "custom interval", customInterval: true, arpeggiates: false, strumParts: 0, singleTone: true },
        { name: "monophonic", customInterval: false, arpeggiates: false, strumParts: 0, singleTone: true}
    ]);
    public static readonly maxChordSize: number = 9;
    public static readonly operatorCount: number = 4;
    public static readonly maxPitchOrOperatorCount: number = Math.max(Config.maxChordSize, Config.operatorCount + 2);
    public static readonly algorithms: DictionaryArray<Algorithm> = toNameMap([
        { name: "1←(2 3 4)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2, 3, 4], [], [], []] },
        { name: "1←(2 3←4)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2, 3], [], [4], []] },
        { name: "1←2←(3 4)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2], [3, 4], [], []] },
        { name: "1←(2 3)←4", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2, 3], [4], [4], []] },
        { name: "1←2←3←4", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2], [3], [4], []] },
        { name: "1←3 2←4", carrierCount: 2, associatedCarrier: [1, 2, 1, 2], modulatedBy: [[3], [4], [], []] },
        { name: "1 2←(3 4)", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[], [3, 4], [], []] },
        { name: "1 2←3←4", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[], [3], [4], []] },
        { name: "(1 2)←3←4", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[3], [3], [4], []] },
        { name: "(1 2)←(3 4)", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[3, 4], [3, 4], [], []] },
        { name: "1 2 3←4", carrierCount: 3, associatedCarrier: [1, 2, 3, 3], modulatedBy: [[], [], [4], []] },
        { name: "(1 2 3)←4", carrierCount: 3, associatedCarrier: [1, 2, 3, 3], modulatedBy: [[4], [4], [4], []] },
        { name: "1 2 3 4", carrierCount: 4, associatedCarrier: [1, 2, 3, 4], modulatedBy: [[], [], [], []] },
        { name: "1←(2 3) 2←4", carrierCount: 2, associatedCarrier: [1, 2, 1, 2], modulatedBy: [[2, 3], [4], [], []] },
        { name: "1←(2 (3 (4", carrierCount: 3, associatedCarrier: [1, 2, 3, 3], modulatedBy: [[2, 3, 4], [3, 4], [4], []] },
    ]);
    public static readonly algorithms6Op: DictionaryArray<Algorithm> = toNameMap([
        //placeholder makes life easier for later
        { name: "Custom", carrierCount: 1, associatedCarrier: [1, 1, 1, 1, 1, 1], modulatedBy: [[2, 3, 4, 5, 6], [], [], [], [], []] },
        //yoinked from SynthBox
        //algortihm Section 1
        { name: "1←2←3←4←5←6", carrierCount: 1, associatedCarrier: [1, 1, 1, 1, 1, 1], modulatedBy: [[2], [3], [4], [5], [6], []] },
        { name: "1←3 2←4←5←6", carrierCount: 2, associatedCarrier: [1, 2, 2, 2, 2, 2], modulatedBy: [[3], [4], [], [5], [6], []] },
        { name: "1←3←4 2←5←6", carrierCount: 2, associatedCarrier: [1, 1, 1, 2, 2, 2], modulatedBy: [[3], [5], [4], [], [6], []] },
        { name: "1←4 2←5 3←6", carrierCount: 3, associatedCarrier: [1, 2, 3, 1, 2, 3], modulatedBy: [[4], [5], [6], [], [], []] },
        //Algorithm Section 2
        { name: "1←3 2←(4 5←6)", carrierCount: 2, associatedCarrier: [1, 2, 2, 2, 2, 2], modulatedBy: [[3], [4, 5], [], [], [6], []] },
        { name: "1←(3 4) 2←5←6", carrierCount: 2, associatedCarrier: [1, 2, 2, 2, 2, 2], modulatedBy: [[3, 4], [5], [], [], [6], []] },
        { name: "1←3 2←(4 5 6)", carrierCount: 2, associatedCarrier: [1, 2, 2, 2, 2, 2], modulatedBy: [[3], [4, 5, 6], [], [], [], []] },
        { name: "1←3 2←(4 5)←6", carrierCount: 2, associatedCarrier: [1, 2, 2, 2, 2, 2], modulatedBy: [[3], [4, 5], [], [6], [6], []] },
        { name: "1←3 2←4←(5 6)", carrierCount: 2, associatedCarrier: [1, 2, 2, 2, 2, 2], modulatedBy: [[3], [4], [], [5, 6], [], []] },
        { name: "1←(2 3 4 5 6)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1, 1, 1], modulatedBy: [[2, 3, 4, 5, 6], [], [], [], [], []] },
        { name: "1←(2 3←5 4←6)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1, 1, 1], modulatedBy: [[2, 3, 4], [], [5], [6], [], []] },
        { name: "1←(2 3 4←5←6)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1, 1, 1], modulatedBy: [[2, 3, 4], [], [], [5], [6], []] },
        //Algorithm Section 3
        { name: "1←4←5 (2 3)←6", carrierCount: 3, associatedCarrier: [1, 2, 3, 1, 2, 3], modulatedBy: [[4], [6], [6], [5], [], []] },
        { name: "1←(3 4)←5 2←6", carrierCount: 2, associatedCarrier: [1, 2, 2, 2, 2, 2], modulatedBy: [[3, 4], [6], [5], [5], [], []] },
        { name: "(1 2)←4 3←(5 6)", carrierCount: 3, associatedCarrier: [1, 2, 3, 1, 2, 3], modulatedBy: [[4], [4], [5, 6], [], [], []] },
        { name: "(1 2)←5 (3 4)←6", carrierCount: 4, associatedCarrier: [1, 2, 3, 4, 4, 4], modulatedBy: [[5], [5], [6], [6], [], []] },
        { name: "(1 2 3)←(4 5 6)", carrierCount: 3, associatedCarrier: [1, 2, 3, 1, 2, 3], modulatedBy: [[4, 5, 6], [4, 5, 6], [4, 5, 6], [], [], []] },
        { name: "1←5 (2 3 4)←6", carrierCount: 4, associatedCarrier: [1, 2, 3, 4, 4, 4], modulatedBy: [[5], [6], [6], [6], [], []] },
        { name: "1 2←5 (3 4)←6", carrierCount: 4, associatedCarrier: [1, 2, 3, 4, 4, 4], modulatedBy: [[], [5], [6], [6], [], []] },
        { name: "1 2 (3 4 5)←6", carrierCount: 5, associatedCarrier: [1, 2, 3, 4, 5, 5], modulatedBy: [[], [], [6], [6], [6], []] },
        { name: "1 2 3 (4 5)←6", carrierCount: 5, associatedCarrier: [1, 2, 3, 4, 5, 5], modulatedBy: [[], [], [], [6], [6], []] },
        //Algorithm Section 3
        { name: "1 2←4 3←(5 6)", carrierCount: 3, associatedCarrier: [1, 2, 3, 3, 3, 3], modulatedBy: [[], [4], [5, 6], [], [], []] },
        { name: "1←4 2←(5 6) 3", carrierCount: 3, associatedCarrier: [1, 2, 3, 3, 3, 3,], modulatedBy: [[4], [5, 6], [], [], [], []] },
        { name: "1 2 3←5 4←6", carrierCount: 4, associatedCarrier: [1, 2, 3, 4, 4, 4], modulatedBy: [[], [], [5], [6], [], []] },
        { name: "1 (2 3)←5←6 4", carrierCount: 4, associatedCarrier: [1, 2, 3, 4, 4, 4,], modulatedBy: [[], [5], [5], [], [6], []] },
        { name: "1 2 3←5←6 4", carrierCount: 4, associatedCarrier: [1, 2, 3, 4, 4, 4], modulatedBy: [[], [], [5, 6], [], [], []] },
        { name: "(1 2 3 4 5)←6", carrierCount: 5, associatedCarrier: [1, 2, 3, 4, 5, 5], modulatedBy: [[6], [6], [6], [6], [6], []] },
        { name: "1 2 3 4 5←6", carrierCount: 5, associatedCarrier: [1, 2, 3, 4, 5, 5], modulatedBy: [[], [], [], [], [6], []] },
        { name: "1 2 3 4 5 6", carrierCount: 6, associatedCarrier: [1, 2, 3, 4, 5, 6], modulatedBy: [[], [], [], [], [], []] },
        //Section 4 where we take our own previous ones for 4op and it gets weird
        { name: "1←(2 (3 (4 (5 (6", carrierCount: 5, associatedCarrier: [1, 2, 3, 4, 5, 5], modulatedBy: [[2, 3, 4, 5, 6], [3, 4, 5, 6], [4, 5, 6], [5, 6], [6], []] },
        { name: "1←(2(3(4(5(6", carrierCount: 1, associatedCarrier: [1, 1, 1, 1, 1, 1], modulatedBy: [[2, 3, 4, 5, 6], [3, 4, 5, 6], [4, 5, 6], [5, 6], [6], []] },
        { name: "1←4(2←5(3←6", carrierCount: 3, associatedCarrier: [1, 2, 3, 1, 2, 3], modulatedBy: [[2, 3, 4], [3, 5], [6], [], [], []] },
        { name: "1←4(2←5 3←6", carrierCount: 3, associatedCarrier: [1, 2, 3, 1, 2, 3], modulatedBy: [[2, 3, 4], [5], [6], [], [], []] },
    ]);
    public static readonly operatorCarrierInterval: ReadonlyArray<number> = [0.0, 0.04, -0.073, 0.091, 0.061, 0.024];
    public static readonly operatorAmplitudeMax: number = 15;
    public static readonly operatorFrequencies: DictionaryArray<OperatorFrequency> = toNameMap([
        { name: "0.12×", mult: 0.125, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "0.25×", mult: 0.25, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "0.5×", mult: 0.5, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "0.75×", mult: 0.75, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "1×", mult: 1.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "~1×", mult: 1.0, hzOffset: 1.5, amplitudeSign: -1.0 },
        { name: "2×", mult: 2.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "~2×", mult: 2.0, hzOffset: -1.3, amplitudeSign: -1.0 },
        { name: "3×", mult: 3.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "3.5×", mult: 3.5, hzOffset: -0.05, amplitudeSign: 1.0 },
        { name: "4×", mult: 4.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "~4×", mult: 4.0, hzOffset: -2.4, amplitudeSign: -1.0 },
        { name: "5×", mult: 5.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "6×", mult: 6.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "7×", mult: 7.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "8×", mult: 8.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "9×", mult: 9.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "10×", mult: 10.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "11×", mult: 11.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "12×", mult: 12.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "13×", mult: 13.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "14×", mult: 14.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "15×", mult: 15.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        //ultrabox
        { name: "16×", mult: 16.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "17×", mult: 17.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        //ultrabox
        { name: "18×", mult: 18.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "19×", mult: 19.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        //ultrabox
        { name: "20×", mult: 20.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "~20×", mult: 20.0, hzOffset: -5.0, amplitudeSign: -1.0 },
        // dogebox (maybe another mod also adds this? I got it from dogebox)
        { name: "25×", mult: 25.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "50×", mult: 50.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "75×", mult: 75.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "100×", mult: 100.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        //50 and 100 are from dogebox
        //128 and 256 from slarmoo's box
        { name: "128×", mult: 128.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        //256× was mistakenly 250×. 250× has been left for preservation of old songs
        { name: "250×", mult: 250.0, hzOffset: 0.0, amplitudeSign: 1.0},
        { name: "256×", mult: 256.0, hzOffset: 0.0, amplitudeSign: 1.0},
        //matchbox
        { name: "512×", mult: 512.0, hzOffset: 0.0, amplitudeSign: 1.0},
        { name: "2^10×", mult: 1024.0, hzOffset: 0.0, amplitudeSign: 1.0},
        { name: "2^12×", mult: 4096.0, hzOffset: 0.0, amplitudeSign: 1.0},
        { name: "2^16×", mult: 65536.0, hzOffset: 0.0, amplitudeSign: 1.0},
        { name: "2^20×", mult: 1048576.0, hzOffset: 0.0, amplitudeSign: 1.0},
        { name: "2^28⚠", mult: 268435456.0, hzOffset: 0.0, amplitudeSign: 0.000000001},
        { name: "2^42⚠", mult: 4398046511104.0, hzOffset: 0.0, amplitudeSign: 0.0000000000000001},
        { name: "⚠⚠⚠⚠", mult: 1180591620717411303424.0, hzOffset: 0.0, amplitudeSign: 1.0}, //2^70
    ]);

    //still used for drumsets
    public static readonly envelopes: DictionaryArray<Envelope> = toNameMap([
        { name: "none", type: EnvelopeType.none, speed: 1.0 },
        { name: "note size", type: EnvelopeType.noteSize, speed: 1.0 },
        { name: "pitch", type: EnvelopeType.pitch, speed: 1.0 }, // Slarmoo's box (fairly useless on drumsets)
        { name: "punch", type: EnvelopeType.punch, speed: 1.0 },
        { name: "flare -1", type: EnvelopeType.flare, speed: 128.0 },
        { name: "flare 1", type: EnvelopeType.flare, speed: 32.0 },
        { name: "flare 2", type: EnvelopeType.flare, speed: 8.0 },
        { name: "flare 3", type: EnvelopeType.flare, speed: 2.0 },
        { name: "twang -1", type: EnvelopeType.twang, speed: 128.0 },
        { name: "twang 1", type: EnvelopeType.twang, speed: 32.0 },
        { name: "twang 2", type: EnvelopeType.twang, speed: 8.0 },
        { name: "twang 3", type: EnvelopeType.twang, speed: 2.0 },
        { name: "swell -1", type: EnvelopeType.swell, speed: 128.0 },
        { name: "swell 1", type: EnvelopeType.swell, speed: 32.0 },
        { name: "swell 2", type: EnvelopeType.swell, speed: 8.0 },
        { name: "swell 3", type: EnvelopeType.swell, speed: 2.0 },
        { name: "tremolo0", type: EnvelopeType.lfo, speed: 8.0 },
        { name: "tremolo1", type: EnvelopeType.lfo, speed: 4.0 },
        { name: "tremolo2", type: EnvelopeType.lfo, speed: 2.0 },
        { name: "tremolo3", type: EnvelopeType.lfo, speed: 1.0 },
        { name: "tremolo4", type: EnvelopeType.tremolo2, speed: 4.0 },
        { name: "tremolo5", type: EnvelopeType.tremolo2, speed: 2.0 },
        { name: "tremolo6", type: EnvelopeType.tremolo2, speed: 1.0 },
        { name: "decay -1", type: EnvelopeType.decay, speed: 40.0 },
        { name: "decay 1", type: EnvelopeType.decay, speed: 10.0 },
        { name: "decay 2", type: EnvelopeType.decay, speed: 7.0 },
        { name: "decay 3", type: EnvelopeType.decay, speed: 4.0 },
        { name: "wibble-1", type: EnvelopeType.wibble, speed: 128.0 }, 
        //Changed speed from 96 to 128. I forgot to include a 96 earlier, and now it's too late to add one, so we have this now. Hopefully no one notices
        // I noticed, Slarmoo.
        { name: "wibble 1", type: EnvelopeType.wibble, speed: 24.0 },
        { name: "wibble 2", type: EnvelopeType.wibble, speed: 12.0 },
        { name: "wibble 3", type: EnvelopeType.wibble, speed: 4.0 },
        { name: "linear-2", type: EnvelopeType.linear, speed: 256.0 },
        { name: "linear-1", type: EnvelopeType.linear, speed: 128.0 },
        { name: "linear 1", type: EnvelopeType.linear, speed: 32.0 },
        { name: "linear 2", type: EnvelopeType.linear, speed: 8.0 },
        { name: "linear 3", type: EnvelopeType.linear, speed: 2.0 },
        { name: "rise -2", type: EnvelopeType.rise, speed: 256.0 },
        { name: "rise -1", type: EnvelopeType.rise, speed: 128.0 },
        { name: "rise 1", type: EnvelopeType.rise, speed: 32.0 },
        { name: "rise 2", type: EnvelopeType.rise, speed: 8.0 },
        { name: "rise 3", type: EnvelopeType.rise, speed: 2.0 },
        // modbox
        { name: "flute 1", type: EnvelopeType.wibble, speed: 16.0 },
        { name: "flute 2", type: EnvelopeType.wibble, speed: 8.0 },
        { name: "flute 3", type: EnvelopeType.wibble, speed: 4.0 },
        // sandbox
        { name: "tripolo1", type: EnvelopeType.lfo, speed: 9.0 },
        { name: "tripolo2", type: EnvelopeType.lfo, speed: 6.0 },
        { name: "tripolo3", type: EnvelopeType.lfo, speed: 3.0 },
        { name: "tripolo4", type: EnvelopeType.tremolo2, speed: 9.0 },
        { name: "tripolo5", type: EnvelopeType.tremolo2, speed: 6.0 },
        { name: "tripolo6", type: EnvelopeType.tremolo2, speed: 3.0 },
        { name: "pentolo1", type: EnvelopeType.lfo, speed: 10.0 },
        { name: "pentolo2", type: EnvelopeType.lfo, speed: 5.0 },
        { name: "pentolo3", type: EnvelopeType.lfo, speed: 2.5 },
        { name: "pentolo4", type: EnvelopeType.tremolo2, speed: 10.0 },
        { name: "pentolo5", type: EnvelopeType.tremolo2, speed: 5.0 },
        { name: "pentolo6", type: EnvelopeType.tremolo2, speed: 2.5 },
        // todbox
        { name: "flutter 1", type: EnvelopeType.lfo, speed: 14.0 },
        { name: "flutter 2", type: EnvelopeType.tremolo2, speed: 11.0 },
        { name: "water-y flutter", type: EnvelopeType.lfo, speed: 9.0 },
        // new jummbox
        { name: "blip 1", type: EnvelopeType.blip, speed: 6.0 },
        { name: "blip 2", type: EnvelopeType.blip, speed: 16.0 },
        { name: "blip 3", type: EnvelopeType.blip, speed: 32.0 },
        // Slarmoo's Box
        { name: "fall 1", type: EnvelopeType.fall, speed: 8.0 },
        { name: "fall 2", type: EnvelopeType.fall, speed: 4.0 },
        { name: "fall 3", type: EnvelopeType.fall, speed: 2.0 },
    ]);

    public static readonly newEnvelopes: DictionaryArray<Envelope> = toNameMap([
        { name: "none", type: EnvelopeType.none, speed: 1.0 },
        { name: "note size", type: EnvelopeType.noteSize, speed: 1.0 },
        { name: "pitch", type: EnvelopeType.pitch, speed: 1.0 },
        { name: "random", type: EnvelopeType.pseudorandom, speed: 4.0 }, //Slarmoo's box 1.3
        { name: "punch", type: EnvelopeType.punch, speed: 1.0 },
        { name: "flare", type: EnvelopeType.flare, speed: 32.0 },
        { name: "twang", type: EnvelopeType.twang, speed: 32.0 },
        { name: "swell", type: EnvelopeType.swell, speed: 32.0 },
        { name: "lfo", type: EnvelopeType.lfo, speed: 4.0 }, //replaced tremolo and tremolo2 Slarmoo's Box 1.3
        { name: "decay", type: EnvelopeType.decay, speed: 10.0 },
        { name: "wibble", type: EnvelopeType.wibble, speed: 24.0 },
        { name: "linear", type: EnvelopeType.linear, speed: 32.0 },
        { name: "rise", type: EnvelopeType.rise, speed: 32.0 },
        { name: "blip", type: EnvelopeType.blip, speed: 6.0 },
        { name: "fall", type: EnvelopeType.fall, speed: 2.0 },
    ]);



	public static readonly feedbacks: DictionaryArray<Feedback> = toNameMap([
		{ name: "1⟲", indices: [[1], [], [], []] },
		{ name: "2⟲", indices: [[], [2], [], []] },
		{ name: "3⟲", indices: [[], [], [3], []] },
		{ name: "4⟲", indices: [[], [], [], [4]] },
		{ name: "1⟲ 2⟲", indices: [[1], [2], [], []] },
		{ name: "3⟲ 4⟲", indices: [[], [], [3], [4]] },
		{ name: "1⟲ 2⟲ 3⟲", indices: [[1], [2], [3], []] },
		{ name: "2⟲ 3⟲ 4⟲", indices: [[], [2], [3], [4]] },
		{ name: "1⟲ 2⟲ 3⟲ 4⟲", indices: [[1], [2], [3], [4]] },
		{ name: "1→2", indices: [[], [1], [], []] },
		{ name: "1→3", indices: [[], [], [1], []] },
		{ name: "1→4", indices: [[], [], [], [1]] },
		{ name: "2→3", indices: [[], [], [2], []] },
		{ name: "2→4", indices: [[], [], [], [2]] },
		{ name: "3→4", indices: [[], [], [], [3]] },
		{ name: "1→3 2→4", indices: [[], [], [1], [2]] },
		{ name: "1→4 2→3", indices: [[], [], [2], [1]] },
        { name: "1→2→3→4", indices: [[], [1], [2], [3]] },
        { name: "1↔2 3↔4", indices: [[2], [1], [4], [3]] },
        { name: "1↔4 2↔3", indices: [[4], [3], [2], [1]] },
        { name: "2→1→4→3→2", indices: [[2], [3], [4], [1]] },
        { name: "1→2→3→4→1", indices: [[4], [1], [2], [3]] },
        { name: "(1 2 3)→4", indices: [[], [], [], [1, 2, 3]] },
        { name: "ALL", indices: [[1,2,3,4], [1,2,3,4], [1,2,3,4], [1, 2, 3,4]] },
    ]);
    public static readonly feedbacks6Op: DictionaryArray<Feedback> = toNameMap([
        //placeholder makes life easier for later
        { name: "Custom", indices: [[2, 3, 4, 5, 6], [], [], [], [], []] },

        { name: "1⟲", indices: [[1], [], [], [], [], []] },
        { name: "2⟲", indices: [[], [2], [], [], [], []] },
        { name: "3⟲", indices: [[], [], [3], [], [], []] },
        { name: "4⟲", indices: [[], [], [], [4], [], []] },
        { name: "5⟲", indices: [[], [], [], [], [5], []] },
        { name: "6⟲", indices: [[], [], [], [], [], [6]] },
        { name: "1⟲ 2⟲", indices: [[1], [2], [], [], [], []] },
        { name: "3⟲ 4⟲", indices: [[], [], [3], [4], [], []] },
        { name: "1⟲ 2⟲ 3⟲", indices: [[1], [2], [3], [], [], []] },
        { name: "2⟲ 3⟲ 4⟲", indices: [[], [2], [3], [4], [], []] },
        { name: "1⟲ 2⟲ 3⟲ 4⟲", indices: [[1], [2], [3], [4], [], []] },
        { name: "1⟲ 2⟲ 3⟲ 4⟲ 5⟲", indices: [[1], [2], [3], [4], [5], []] },
        { name: "1⟲ 2⟲ 3⟲ 4⟲ 5⟲ 6⟲", indices: [[1], [2], [3], [4], [5], [6]] },
        { name: "1→2", indices: [[], [1], [], [], [], []] },
        { name: "1→3", indices: [[], [], [1], [], [], []] },
        { name: "1→4", indices: [[], [], [], [1], [], []] },
        { name: "1→5", indices: [[], [], [], [], [1], []] },
        { name: "1→6", indices: [[], [], [], [], [], [1]] },
        { name: "2→3", indices: [[], [], [2], [], [], []] },
        { name: "2→4", indices: [[], [], [], [2], [], []] },
        { name: "3→4", indices: [[], [], [], [3], [], []] },
        { name: "4→5", indices: [[], [], [], [], [4], []] },
        { name: "1→4 2→5 3→6", indices: [[], [], [], [1], [2], [3]] },
        { name: "1→5 2→6 3→4", indices: [[], [], [], [3], [1], [2]] },
        { name: "1→2→3→4→5→6", indices: [[], [1], [2], [3], [4], [5]] },
        { name: "2→1→6→5→4→3→2", indices: [[2], [3], [4], [5], [6], [1]] },
        { name: "1→2→3→4→5→6→1", indices: [[6], [1], [2], [3], [4], [5]] },
        { name: "1↔2 3↔4 5↔6", indices: [[2], [1], [4], [3], [6], [5]] },
        { name: "1↔4 2↔5 3↔6", indices: [[4], [5], [6], [1], [2], [3]] },
        { name: "(1,2,3,4,5)→6", indices: [[], [], [], [], [], [1, 2, 3, 4, 5]] },
        { name: "ALL", indices: [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]] },
    ]);
    public static readonly chipNoiseLength: number = 1 << 15; // 32768
    public static readonly spectrumNoiseLength: number = 1 << 15; // 32768
    public static readonly spectrumBasePitch: number = 24;
    public static readonly spectrumControlPoints: number = 30;
    public static readonly spectrumControlPointsPerOctave: number = 7;
    public static readonly spectrumControlPointBits: number = 3;
    public static readonly spectrumMax: number = (1 << Config.spectrumControlPointBits) - 1;
    public static readonly harmonicsControlPoints: number = 28;
    public static readonly harmonicsRendered: number = 64;
    public static readonly harmonicsRenderedForPickedString: number = 1 << 8; // 256
    public static readonly harmonicsControlPointBits: number = 3;
    public static readonly harmonicsMax: number = (1 << Config.harmonicsControlPointBits) - 1;
    public static readonly harmonicsWavelength: number = 1 << 11; // 2048
    public static readonly pulseWidthRange: number = 50;
    public static readonly pulseWidthStepPower: number = 0.5;
    public static readonly supersawVoiceCount: number = 7;
	public static readonly supersawDynamismMax: number = 6;
	public static readonly supersawSpreadMax: number = 12;
	public static readonly supersawShapeMax: number = 6;
    public static readonly pitchChannelCountMin: number = 1;
    public static readonly pitchChannelCountMax: number = 200; //slarmoo: 60
    public static readonly noiseChannelCountMin: number = 0;
    public static readonly noiseChannelCountMax: number = 200; //slarmoo: 60
    public static readonly modChannelCountMin: number = 0;
    public static readonly modChannelCountMax: number = 200; //slarmoo: 60
    public static readonly noiseInterval: number = 6;
    public static readonly drumCount: number = 12;
    public static readonly pitchOctaves: number = 8;
    public static readonly modCount: number = 6;
    public static readonly maximumTonesPerChannel: number = Config.maxChordSize * 2;
    public static readonly justIntonationSemitones: number[] = [1.0 / 2.0, 8.0 / 15.0, 9.0 / 16.0, 3.0 / 5.0, 5.0 / 8.0, 2.0 / 3.0, 32.0 / 45.0, 3.0 / 4.0, 4.0 / 5.0, 5.0 / 6.0, 8.0 / 9.0, 15.0 / 16.0, 1.0, 16.0 / 15.0, 9.0 / 8.0, 6.0 / 5.0, 5.0 / 4.0, 4.0 / 3.0, 45.0 / 32.0, 3.0 / 2.0, 8.0 / 5.0, 5.0 / 3.0, 16.0 / 9.0, 15.0 / 8.0, 2.0].map(x => Math.log2(x) * 12);
    public static readonly pitchShiftRange: number = Config.justIntonationSemitones.length;
    public static readonly pitchShiftCenter: number = Config.pitchShiftRange >> 1;
    public static readonly detuneCenter: number = 200;
    public static readonly detuneMax: number = 400;
    public static readonly detuneMin: number = 0;
    public static readonly equaveDivisionsMax: number = 256; //froupbox 128
    public static readonly equaveDivisionsMin: number = 1;
    public static readonly equaveNumeratorMax: number = 4096;
    public static readonly equaveDenominatorMax: number = 4096;
    public static readonly songDetuneMin: number = 0;
    public static readonly songDetuneMax: number = 500;
    public static readonly unisonVoicesMin: number = 1;
    public static readonly unisonVoicesMax: number = 9;
    public static readonly unisonSpreadMin: number = -96;
    public static readonly unisonSpreadMax: number = 96; 
    public static readonly unisonOffsetMin: number = -96;
    public static readonly unisonOffsetMax: number = 96; 
    public static readonly unisonExpressionMin: number = -2;
    public static readonly unisonExpressionMax: number = 2; 
    public static readonly unisonSignMin: number = -2;
    public static readonly unisonSignMax: number = 2; 
    public static readonly sineWaveLength: number = 1 << 8; // 256
    public static readonly sineWaveMask: number = Config.sineWaveLength - 1;

    public static generateSineWave(): Float32Array {
        const wave: Float32Array = new Float32Array(Config.sineWaveLength + 1);
        for (let i: number = 0; i < Config.sineWaveLength + 1; i++) {
            wave[i] = Math.sin(i * Math.PI * 2.0 / Config.sineWaveLength);
        }
        return wave;
    }

    public static generateTriWave(): Float32Array {
        const wave: Float32Array = new Float32Array(Config.sineWaveLength + 1);
        for (let i: number = 0; i < Config.sineWaveLength + 1; i++) {
            wave[i] = Math.asin(Math.sin(i * Math.PI * 2.0 / Config.sineWaveLength)) / (Math.PI / 2);
        }
        return wave;
    }

    public static generateTrapezoidWave(drive: number = 2): Float32Array {
        const wave: Float32Array = new Float32Array(Config.sineWaveLength + 1);
        for (let i: number = 0; i < Config.sineWaveLength + 1; i++) {
            wave[i] = Math.max(-1.0, Math.min(1.0, Math.asin(Math.sin(i * Math.PI * 2.0 / Config.sineWaveLength)) * drive));
        }
        return wave;
    }

    public static generateSquareWave(phaseWidth: number = 0): Float32Array {
        const wave: Float32Array = new Float32Array(Config.sineWaveLength + 1);
        const centerPoint: number = Config.sineWaveLength / 4;
        for (let i: number = 0; i < Config.sineWaveLength + 1; i++) {
            wave[i] = +((Math.abs(i - centerPoint) < phaseWidth * Config.sineWaveLength / 2)
                || ((Math.abs(i - Config.sineWaveLength - centerPoint) < phaseWidth * Config.sineWaveLength / 2))) * 2 - 1;
        }
        return wave;
    }

    public static generateSawWave(inverse: boolean = false): Float32Array {
        const wave: Float32Array = new Float32Array(Config.sineWaveLength + 1);
        for (let i: number = 0; i < Config.sineWaveLength + 1; i++) {
            wave[i] = ((i + (Config.sineWaveLength / 4.0)) * 2.0 / Config.sineWaveLength) % 2 - 1;
            wave[i] = inverse ? -wave[i] : wave[i];
        }
        return wave;
    }

    public static generateSemisineWave() {
        const wave = new Float32Array(Config.sineWaveLength + 1);
        for (let i = 0; i < Config.sineWaveLength + 1; i++) {
            wave[i] = Math.max(Math.sin(i * Math.PI * 2.0 / Config.sineWaveLength), 0);
        }
        return wave;
    }

    public static generateWhiteNoiseFmWave() {
        const wave = new Float32Array(Config.sineWaveLength + 1);
        for (let i = 0; i < Config.sineWaveLength + 1; i++) {
            wave[i] = Math.random() * 2.0 - 1.0;
        }
        return wave;
    }
    // pupblic static generateOneBitWhiteNoiseFmWave() {
    // const wave = new Float32Array(Config.sineWaveLength + 1);
    // for (let i = 0; i < Config.sineWaveLength + 1; i++) {
    // wave[i] = Math.round(Math.random());
    // }
    // return wave;
    // }
    
    public static generateQuasiSineWave() {
        const wave = new Float32Array(Config.sineWaveLength + 1);
        for (let i = 0; i < Config.sineWaveLength + 1; i++) {
            wave[i] = Math.round(Math.sin(i * Math.PI * 2.0 / Config.sineWaveLength));
        }
        return wave;
    }

    //AcBox
    public static generateAbsSineWave(): Float32Array {
        const wave: Float32Array = new Float32Array(Config.sineWaveLength + 1);
        for (let i: number = 0; i < Config.sineWaveLength + 1; i++) {
            wave[i] = Math.abs(Math.sin(i * Math.PI * 2.0 / Config.sineWaveLength));
        }
        return wave;
    }

    public static generateQuarterSineWave(): Float32Array {
        const wave: Float32Array = new Float32Array(Config.sineWaveLength + 1);
        for (let i: number = 0; i < Config.sineWaveLength + 1; i++) {
            let q = Math.floor((i*4)/Config.sineWaveLength);

            if (q == 0 || q == 2) {
                wave[i] = Math.abs(Math.sin(i * Math.PI * 2.0 / Config.sineWaveLength));
            } else {
                wave[i] = 0;
            }
                
        }
        return wave;
    }

    public static generateSquishedSineWave(): Float32Array {
        const wave: Float32Array = new Float32Array(Config.sineWaveLength + 1);
        for (let i: number = 0; i < Config.sineWaveLength + 1; i++) {
            if (i < Config.sineWaveLength / 2) {
                wave[i] = Math.sin(2 * i * Math.PI * 2.0 / Config.sineWaveLength);
            } else {
                wave[i] = 0;
            }
                
        }
        return wave;
    }

    public static generateSquishedAbsSineWave(): Float32Array {
        const wave: Float32Array = new Float32Array(Config.sineWaveLength + 1);
        for (let i: number = 0; i < Config.sineWaveLength + 1; i++) {
            if (i < Config.sineWaveLength / 2) {
                wave[i] = Math.abs(Math.sin(2 * i * Math.PI * 2.0 / Config.sineWaveLength));
            } else {
                wave[i] = 0;
            }
                
        }
        return wave;
    }
    
    

    public static readonly sineWave: Float32Array = Config.generateSineWave();

    public static readonly perEnvelopeSpeedIndices: number[] = [0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.2, 0.25, 0.3, 0.3333, 0.4, 0.5, 0.6, 0.6667, 0.7, 0.75, 0.8, 0.9, 1, 1.25, 1.3333, 1.5, 1.6667, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 32, 40, 64, 128, 256];
    public static readonly perEnvelopeSpeedToIndices: Dictionary<number> = { //used to convert speeds back into indices
        0: 0,
        0.01: 1,
        0.02: 2,
        0.03: 3,
        0.04: 4,
        0.05: 5,
        0.06: 6,
        0.07: 7,
        0.08: 8,
        0.09: 9,
        0.1: 10,
        0.2: 11,
        0.25: 12,
        0.3: 13,
        0.3333: 14,
        0.4: 15,
        0.5: 16,
        0.6: 17,
        0.6667: 18,
        0.7: 19,
        0.75: 20,
        0.8: 21,
        0.9: 22,
        1: 23,
        1.25: 24,
        1.3333: 25,
        1.5: 26,
        1.6667: 27,
        1.75: 28,
        2: 29,
        2.25: 30,
        2.5: 31,
        2.75: 32,
        3: 33,
        3.5: 34,
        4: 35,
        4.5: 36,
        5: 37,
        5.5: 38,
        6: 39,
        6.5: 40,
        7: 41,
        7.5: 42,
        8: 43,
        8.5: 44,
        9: 45,
        9.5: 46,
        10: 47,
        11: 48,
        12: 49,
        13: 50,
        14: 51,
        15: 52,
        16: 53,
        17: 54,
        18: 55,
        19: 56,
        20: 57,
        24: 58,
        32: 59,
        40: 60,
        64: 61,
        128: 62,
        256: 63,
    }

    public static readonly perEnvelopeBoundMin: number = 0; //probably should leave at 0. Negative envelopes are problematic right now
    public static readonly perEnvelopeBoundMax: number = 2; //max of 6.3 unless you update url
    public static readonly randomEnvelopeSeedMax: number = 63; //if you increase this you'll need to update the url to support it
    public static readonly randomEnvelopeStepsMax: number = 32; 

    // Picked strings have an all-pass filter with a corner frequency based on the tone fundamental frequency, in order to add a slight inharmonicity. (Which is important for distortion.)
    public static readonly pickedStringDispersionCenterFreq: number = 6000.0; // The tone fundamental freq is pulled toward this freq for computing the all-pass corner freq.
    public static readonly pickedStringDispersionFreqScale: number = 0.3; // The tone fundamental freq freq moves this much toward the center freq for computing the all-pass corner freq.
    public static readonly pickedStringDispersionFreqMult: number = 4.0; // The all-pass corner freq is based on this times the adjusted tone fundamental freq.
    public static readonly pickedStringShelfHz: number = 4000.0; // The cutoff freq of the shelf filter that is used to decay the high frequency energy in the picked string.

    public static readonly distortionRange: number = 8;
    public static readonly stringSustainRange: number = 15;
    public static readonly stringDecayRate: number = 0.12;
    public static readonly enableAcousticSustain: boolean = false;
	public static readonly sustainTypeNames: ReadonlyArray<string> = ["bright", "acoustic"]; // See SustainType enum above.

    public static readonly bitcrusherFreqRange: number = 14;
    public static readonly bitcrusherOctaveStep: number = 0.5;
    public static readonly bitcrusherQuantizationRange: number = 8;

    public static readonly maxEnvelopeCount: number = 63; //slarmoo 16
    public static readonly defaultAutomationRange: number = 13;
    public static readonly instrumentAutomationTargets: DictionaryArray<AutomationTarget> = toNameMap([
        { name: "none",                   computeIndex: null,                                           displayName: "none",             perNote: false, interleave: false, isFilter: false, /*range: 0,                              */    maxCount: 1, effect: null, compatibleInstruments: null },
        { name: "noteVolume",             computeIndex: EnvelopeComputeIndex.noteVolume,                displayName: "note volume",      perNote: true,  interleave: false, isFilter: false, /*range: Config.volumeRange,             */    maxCount: 1, effect: null, compatibleInstruments: null },
        { name: "pulseWidth",             computeIndex: EnvelopeComputeIndex.pulseWidth,                displayName: "pulse width",      perNote: true,  interleave: false, isFilter: false, /*range: Config.pulseWidthRange,         */    maxCount: 1, effect: null, compatibleInstruments: [InstrumentType.pwm, InstrumentType.supersaw] },
        { name: "stringSustain",          computeIndex: EnvelopeComputeIndex.stringSustain,             displayName: "sustain",          perNote: true,  interleave: false, isFilter: false, /*range: Config.stringSustainRange,      */    maxCount: 1, effect: null, compatibleInstruments: [InstrumentType.pickedString] },
        { name: "unison",                 computeIndex: EnvelopeComputeIndex.unison,                    displayName: "unison",           perNote: true,  interleave: false, isFilter: false, /*range: Config.defaultAutomationRange,  */    maxCount: 1, effect: null, compatibleInstruments: [InstrumentType.chip, InstrumentType.harmonics, InstrumentType.pickedString, InstrumentType.customChipWave, InstrumentType.pwm, InstrumentType.noise, InstrumentType.spectrum, InstrumentType.drumset, InstrumentType.fm, InstrumentType.fm6op, InstrumentType.supersaw] },
        { name: "operatorFrequency",      computeIndex: EnvelopeComputeIndex.operatorFrequency0,        displayName: "fm# freq",         perNote: true,  interleave: true, isFilter: false, /*range: Config.defaultAutomationRange,  */    maxCount: Config.operatorCount+2, effect: null, compatibleInstruments: [InstrumentType.fm, InstrumentType.fm6op] },
        { name: "operatorAmplitude",      computeIndex: EnvelopeComputeIndex.operatorAmplitude0,        displayName: "fm# volume",       perNote: true,  interleave: false, isFilter: false, /*range: Config.operatorAmplitudeMax + 1,*/    maxCount: Config.operatorCount+2, effect: null, compatibleInstruments: [InstrumentType.fm, InstrumentType.fm6op] },
        { name: "feedbackAmplitude",      computeIndex: EnvelopeComputeIndex.feedbackAmplitude,         displayName: "fm feedback",      perNote: true,  interleave: false, isFilter: false, /*range: Config.operatorAmplitudeMax + 1,*/    maxCount: 1, effect: null, compatibleInstruments: [InstrumentType.fm, InstrumentType.fm6op] },
        { name: "pitchShift",             computeIndex: EnvelopeComputeIndex.pitchShift,                displayName: "pitch shift",      perNote: true,  interleave: false, isFilter: false, /*range: Config.pitchShiftRange,         */    maxCount: 1, effect: EffectType.pitchShift, compatibleInstruments: null },
        { name: "detune",                 computeIndex: EnvelopeComputeIndex.detune,                    displayName: "detune",           perNote: true,  interleave: false, isFilter: false, /*range: Config.detuneMax + 1,           */    maxCount: 1, effect: EffectType.detune, compatibleInstruments: null },
        { name: "vibratoDepth",           computeIndex: EnvelopeComputeIndex.vibratoDepth,              displayName: "vibrato depth",    perNote: true,  interleave: false, isFilter: false, /*range: Config.defaultAutomationRange,  */    maxCount: 1, effect: EffectType.vibrato, compatibleInstruments: null },
        //{ name: "vibratoSpeed",         computeIndex: EnvelopeComputeIndex.vibratoSpeed,              displayName: "vibrato speed",  /*perNote: true,*/ interleave: false, isFilter: false, /*range: Config.defaultAutomationRange,  */    maxCount: 1, effect: EffectType.vibrato, compatibleInstruments: null },
        { name: "noteFilterAllFreqs",     computeIndex: EnvelopeComputeIndex.noteFilterAllFreqs,        displayName: "n. filter freqs",  perNote: true,  interleave: false, isFilter: true, /*range: null,                           */    maxCount: 1, effect: EffectType.noteFilter, compatibleInstruments: null },
        { name: "noteFilterFreq",         computeIndex: EnvelopeComputeIndex.noteFilterFreq0,           displayName: "n. filter # freq", perNote: true,  interleave: false/*true*/, isFilter: true, /*range: Config.filterFreqRange,     */        maxCount: Config.filterMaxPoints, effect: EffectType.noteFilter, compatibleInstruments: null },
        { name: "decimalOffset",          computeIndex: EnvelopeComputeIndex.decimalOffset,             displayName: "decimal offset",   perNote: true,  interleave: false, isFilter: false, /*range: Config.pulseWidthRange,         */    maxCount: 1, effect: null, compatibleInstruments: [InstrumentType.pwm, InstrumentType.supersaw] },
        { name: "supersawDynamism",       computeIndex: EnvelopeComputeIndex.supersawDynamism,          displayName: "dynamism",         perNote: true,  interleave: false, isFilter: false, /*range: Config.supersawDynamismMax + 1, */    maxCount: 1,    effect: null,                    compatibleInstruments: [InstrumentType.supersaw]},
		{ name: "supersawSpread",         computeIndex: EnvelopeComputeIndex.supersawSpread,            displayName: "spread",           perNote: true,  interleave: false, isFilter: false, /*range: Config.supersawSpreadMax + 1,   */    maxCount: 1,    effect: null,                    compatibleInstruments: [InstrumentType.supersaw]},
        { name: "supersawShape",          computeIndex: EnvelopeComputeIndex.supersawShape,             displayName: "saw↔pulse",        perNote: true,  interleave: false, isFilter: false, /*range: Config.supersawShapeMax + 1,    */    maxCount: 1, effect: null, compatibleInstruments: [InstrumentType.supersaw] },    
        { name: "panning",                computeIndex: EnvelopeComputeIndex.panning,                   displayName: "panning",          perNote: false, interleave: false, isFilter: false, /*range: Config.chorusRange,    */  maxCount: 1, effect: EffectType.panning, compatibleInstruments: null },
        { name: "distortion",             computeIndex: EnvelopeComputeIndex.distortion,                displayName: "distortion",       perNote: false, interleave: false, isFilter: false, /*range: Config.defaultAutomationRange,  */    maxCount: 1, effect: EffectType.distortion, compatibleInstruments: null }, 
        { name: "bitcrusherQuantization", computeIndex: EnvelopeComputeIndex.bitcrusherQuantization,    displayName: "bitcrush",         perNote: false, interleave: false, isFilter: false, /*range: Config.defaultAutomationRange,  */    maxCount: 1, effect: EffectType.bitcrusher, compatibleInstruments: null }, 
        { name: "bitcrusherFrequency",    computeIndex: EnvelopeComputeIndex.bitcrusherFrequency,       displayName: "freq crush",       perNote: false, interleave: false, isFilter: false, /*range: Config.defaultAutomationRange,  */    maxCount: 1, effect: EffectType.bitcrusher, compatibleInstruments: null },
        { name: "chorus",                 computeIndex: EnvelopeComputeIndex.chorus,                    displayName: "chorus",           perNote: false, interleave: false, isFilter: false, /*range: Config.chorusRange,    */  maxCount: 1, effect: EffectType.chorus, compatibleInstruments: null },
        { name: "echoSustain",            computeIndex: EnvelopeComputeIndex.echoSustain,               displayName: "echo",             perNote: false, interleave: false, isFilter: false, /*range: Config.chorusRange,    */  maxCount: 1, effect: EffectType.echo, compatibleInstruments: null },
        { name: "reverb",                 computeIndex: EnvelopeComputeIndex.reverb,                    displayName: "reverb",           perNote: false, interleave: false, isFilter: false, /*range: Config.chorusRange,    */  maxCount: 1, effect: EffectType.reverb, compatibleInstruments: null },
        { name: "arpeggioSpeed",          computeIndex: EnvelopeComputeIndex.arpeggioSpeed,             displayName: "arpeggio speed",   perNote: false, interleave: false, isFilter: false, /*range: Config.chorusRange,    */  maxCount: 1, effect: EffectType.chord, compatibleInstruments: null },
        { name: "ringModulation",         computeIndex: EnvelopeComputeIndex.ringModulation,            displayName: "ring mod",         perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.ringModulation, compatibleInstruments: null },
        { name: "ringModulationHz",       computeIndex: EnvelopeComputeIndex.ringModulationHz,          displayName: "ring mod hz",      perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.ringModulation, compatibleInstruments: null },
        { name: "granular",               computeIndex: EnvelopeComputeIndex.granular,                  displayName: "granular",         perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.granular, compatibleInstruments: null },
        { name: "grainFreq",              computeIndex: EnvelopeComputeIndex.grainAmount,               displayName: "grain freq",       perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.granular, compatibleInstruments: null },
        { name: "grainSize",              computeIndex: EnvelopeComputeIndex.grainSize,                 displayName: "grain size",       perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.granular, compatibleInstruments: null },
        { name: "grainRange",             computeIndex: EnvelopeComputeIndex.grainRange,                displayName: "grain range",      perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.granular, compatibleInstruments: null },
        { name: "echoDelay",              computeIndex: EnvelopeComputeIndex.echoDelay,                 displayName: "echo delay",       perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.echo, compatibleInstruments: null },
        { name: "phaserFreq",             computeIndex: EnvelopeComputeIndex.phaserFreq,                displayName: "phaser freq",      perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.phaser, compatibleInstruments: null },
        { name: "phaserMix",              computeIndex: EnvelopeComputeIndex.phaserMix,                 displayName: "phaser",           perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.phaser, compatibleInstruments: null },
        { name: "phaserFeedback",         computeIndex: EnvelopeComputeIndex.phaserFeedback,            displayName: "phaser feedback",  perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.phaser, compatibleInstruments: null },
        { name: "phaserStages",           computeIndex: EnvelopeComputeIndex.phaserStages,              displayName: "phaser stages",    perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.phaser, compatibleInstruments: null },
        // Controlling filter gain is less obvious and intuitive than controlling filter freq, so to avoid confusion I've disabled it for now...
        //{name: "noteFilterGain",         computeIndex:       EnvelopeComputeIndex.noteFilterGain0,        displayName: "n. filter # vol",  /*perNote:  true,*/ interleave: false, isFilter:  true, range: Config.filterGainRange,             maxCount: Config.filterMaxPoints, effect: EffectType.noteFilter, compatibleInstruments: null},
        /*
        {name: "eqFilterAllFreqs",       computeIndex: InstrumentAutomationIndex.eqFilterAllFreqs,       displayName: "eq filter freqs",  perNote: false, interleave: false, isFilter:  true, range: null,                               maxCount: 1,    effect: null,                    compatibleInstruments: null},
        {name: "eqFilterFreq",           computeIndex: InstrumentAutomationIndex.eqFilterFreq0,          displayName: "eq filter # freq", perNote: false, interleave:  true, isFilter:  true, range: Config.filterFreqRange,             maxCount: Config.filterMaxPoints, effect: null,  compatibleInstruments: null},
        {name: "eqFilterGain",           computeIndex: InstrumentAutomationIndex.eqFilterGain0,          displayName: "eq filter # vol",  perNote: false, interleave: false, isFilter:  true, range: Config.filterGainRange,             maxCount: Config.filterMaxPoints, effect: null,  compatibleInstruments: null},
        {name: "mixVolume",              computeIndex: InstrumentAutomationIndex.mixVolume,              displayName: "mix volume",       perNote: false, interleave: false, isFilter: false, range: Config.volumeRange,                 maxCount: 1,    effect: null,                    compatibleInstruments: null},
        {name: "envelope#",              computeIndex: null,                                             displayName: "envelope",         perNote: false, interleave: false, isFilter: false, range: Config.defaultAutomationRange,      maxCount: Config.maxEnvelopeCount, effect: null, compatibleInstruments: null}, // maxCount special case for envelopes to be allowed to target earlier ones.
        */
        { name: "compressorThreshold",    computeIndex: EnvelopeComputeIndex.compressorThreshold,       displayName: "comp. threshold",  perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.compressor, compatibleInstruments: null },
        { name: "compressorTime",         computeIndex: EnvelopeComputeIndex.compressorTime,            displayName: "comp. time",       perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.compressor, compatibleInstruments: null },
        { name: "compressorRatioDown",    computeIndex: EnvelopeComputeIndex.compressorRatioDown,       displayName: "comp. ratio down", perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.compressor, compatibleInstruments: null },
        { name: "compressorRatioUp",      computeIndex: EnvelopeComputeIndex.compressorRatioUp,         displayName: "comp. ratio up",   perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.compressor, compatibleInstruments: null },
        { name: "compressorLoGain",       computeIndex: EnvelopeComputeIndex.compressorLoGain,          displayName: "comp. low gain",   perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.compressor, compatibleInstruments: null },
        { name: "compressorMidGain",      computeIndex: EnvelopeComputeIndex.compressorMidGain,         displayName: "comp. mid gain",   perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.compressor, compatibleInstruments: null },
        { name: "compressorHiGain",       computeIndex: EnvelopeComputeIndex.compressorHiGain,          displayName: "comp. high gain",  perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.compressor, compatibleInstruments: null },
        { name: "flangerMix",             computeIndex: EnvelopeComputeIndex.flangerMix,                displayName: "flanger mix",      perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.flanger, compatibleInstruments: null },
        { name: "flangerDelay",           computeIndex: EnvelopeComputeIndex.flangerDelay,              displayName: "flanger delay",    perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.flanger, compatibleInstruments: null },
        { name: "flangerPan",             computeIndex: EnvelopeComputeIndex.flangerPan,                displayName: "flanger pan",      perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.flanger, compatibleInstruments: null },
        { name: "flangerFeedmix",         computeIndex: EnvelopeComputeIndex.flangerFeedmix,            displayName: "flanger feedmix",  perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.flanger, compatibleInstruments: null },
        { name: "flangerVoices",          computeIndex: EnvelopeComputeIndex.flangerVoices,             displayName: "flanger voices",   perNote: false, interleave: false, isFilter: false, maxCount: 1, effect: EffectType.flanger, compatibleInstruments: null }, 
    ]);
    public static readonly operatorWaves: DictionaryArray<OperatorWave> = toNameMap([
		{ name: "sine", samples: Config.sineWave },
        { name: "triangle", samples: Config.generateTriWave() },
        { name: "pulse width", samples: Config.generateSquareWave(0.5) },
        { name: "sawtooth", samples: Config.generateSawWave() },
        { name: "ramp", samples: Config.generateSawWave(true) },
        { name: "trapezoid", samples: Config.generateTrapezoidWave(2) },
        { name: "quasi-sine", samples: Config.generateQuasiSineWave() },
        { name: "half-sine", samples: Config.generateSemisineWave() },
		{ name: "white noise", samples: Config.generateWhiteNoiseFmWave() },
		{ name: "absine", samples: Config.generateAbsSineWave() },
        { name: "sharksine", samples: Config.generateQuarterSineWave() },
        { name: "fastsine", samples: Config.generateSquishedSineWave() },
        { name: "camelsine", samples: Config.generateSquishedAbsSineWave() },
    	// { name: "1-bit white noise", samples: Config.generateOneBitWhiteNoiseFmWave() },
    ]);
    public static readonly pwmOperatorWaves: DictionaryArray<OperatorWave> = toNameMap([
        { name: "1%", samples: Config.generateSquareWave(0.01) },
        { name: "5%", samples: Config.generateSquareWave(0.05) },
        { name: "12.5%", samples: Config.generateSquareWave(0.125) },
        { name: "25%", samples: Config.generateSquareWave(0.25) },
        { name: "33%", samples: Config.generateSquareWave(1 / 3) },
        { name: "50%", samples: Config.generateSquareWave(0.5) },
        { name: "66%", samples: Config.generateSquareWave(2 / 3) },
        { name: "75%", samples: Config.generateSquareWave(0.75) },
        { name: "87.5%", samples: Config.generateSquareWave(0.875) },
        { name: "95%", samples: Config.generateSquareWave(0.95) },
        { name: "99%", samples: Config.generateSquareWave(0.99) },
    ]);


    // Height of the small editor column for inserting/deleting rows, in pixels.
    public static readonly barEditorHeight: number = 10;

    // Careful about changing index ordering for this. Index is stored in URL/JSON etc.
    public static readonly modulators: DictionaryArray<Modulator> = toNameMap([
        { name: "none", 
            pianoName: "None", 
            maxRawVol: 6, newNoteVol: 6, forSong: true, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "No Mod Setting", 
            promptDesc: [ "No setting has been chosen yet, so this modulator will have no effect. Try choosing a setting with the dropdown, then click this '?' again for more info.", "[$LO - $HI]" ] },
        { name: "song volume", 
            pianoName: "Volume", 
            maxRawVol: 100, newNoteVol: 100, forSong: true, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "Song Volume", 
            promptDesc: [ "This setting affects the overall volume of the song, just like the main volume slider.", "At $HI, the volume will be unchanged from default, and it will get gradually quieter down to $LO.", "[MULTIPLICATIVE] [$LO - $HI] [%]" ] },
        { name: "tempo", 
            pianoName: "Tempo", 
            maxRawVol: Config.tempoMax - Config.tempoMin, newNoteVol: Math.ceil((Config.tempoMax - Config.tempoMin) / 2), forSong: true, convertRealFactor: Config.tempoMin, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "Song Tempo", 
            promptDesc: [ "This setting controls the speed your song plays at, just like the tempo slider.", "When you first make a note for this setting, it will default to your current tempo. Raising it speeds up the song, up to $HI BPM, and lowering it slows it down, to a minimum of $LO BPM.", "Note that you can make a 'swing' effect by rapidly changing between two tempo values.", "[OVERWRITING] [$LO - $HI] [BPM]" ] },
        { name: "song reverb", 
            pianoName: "Reverb", 
            maxRawVol: Config.reverbRange * 2, newNoteVol: Config.reverbRange, forSong: true, convertRealFactor: -Config.reverbRange, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "Song Reverb", 
            promptDesc: [ "This setting affects the overall reverb of your song. It works by multiplying existing reverb for instruments, so those with no reverb set will be unaffected.", "At $MID, all instruments' reverb will be unchanged from default. This increases up to double the reverb value at $HI, or down to no reverb at $LO.", "[MULTIPLICATIVE] [$LO - $HI]" ] },
        { name: "next bar", 
            pianoName: "Next Bar", 
            maxRawVol: 1, newNoteVol: 1, forSong: true, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "Go To Next Bar", 
            promptDesc: [ "This setting functions a little different from most. Wherever a note is placed, the song will jump immediately to the next bar when it is encountered.", "This jump happens at the very start of the note, so the length of a next-bar note is irrelevant. Also, the note can be value 0 or 1, but the value is also irrelevant - wherever you place a note, the song will jump.", "You can make mixed-meter songs or intro sections by cutting off unneeded beats with a next-bar modulator.", "[$LO - $HI]" ] },
        { name: "note volume", 
            pianoName: "Note Vol.", 
            maxRawVol: Config.volumeRange, newNoteVol: Math.ceil(Config.volumeRange / 2), forSong: false, convertRealFactor: Math.ceil(-Config.volumeRange / 2.0), associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "Note Volume", 
            promptDesc: [ "This setting affects the volume of your instrument as if its note size had been scaled.", "At $MID, an instrument's volume will be unchanged from default. This means you can still use the volume sliders to mix the base volume of instruments. The volume gradually increases up to $HI, or decreases down to mute at $LO.", "This setting was the default for volume modulation in JummBox for a long time. Due to some new effects like distortion and bitcrush, note volume doesn't always allow fine volume control. Also, this modulator affects the value of FM modulator waves instead of just carriers. This can distort the sound which may be useful, but also may be undesirable. In those cases, use the 'mix volume' modulator instead, which will always just scale the volume with no added effects.", "For display purposes, this mod will show up on the instrument volume slider, as long as there is not also an active 'mix volume' modulator anyhow. However, as mentioned, it works more like changing note volume.", "[MULTIPLICATIVE] [$LO - $HI]" ] },
        { name: "pan", 
            pianoName: "Pan", 
            maxRawVol: Config.panMax, newNoteVol: Math.ceil(Config.panMax / 2), forSong: false, convertRealFactor: 0, associatedEffect: EffectType.panning, maxIndex: 0,
            promptName: "Instrument Panning", 
            promptDesc: [ "This setting controls the panning of your instrument, just like the panning slider.", "At $LO, your instrument will sound like it is coming fully from the left-ear side. At $MID it will be right in the middle, and at $HI, it will sound like it's on the right.", "[OVERWRITING] [$LO - $HI] [L-R]" ] },
        { name: "reverb", 
            pianoName: "Reverb", 
            maxRawVol: Config.reverbRange, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.reverb, maxIndex: 0,
            promptName: "Instrument Reverb", 
            promptDesc: [ "This setting controls the reverb of your insturment, just like the reverb slider.", "At $LO, your instrument will have no reverb. At $HI, it will be at maximum.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "distortion", 
            pianoName: "Distortion", 
            maxRawVol: Config.distortionRange-1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.distortion, maxIndex: 0,
            promptName: "Instrument Distortion", 
            promptDesc: [ "This setting controls the amount of distortion for your instrument, just like the distortion slider.", "At $LO, your instrument will have no distortion. At $HI, it will be at maximum.", "[OVERWRITING] [$LO - $HI]" ] },
        { name: "fm slider 1", 
            pianoName: "FM 1", 
            maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "FM Slider 1", 
            promptDesc: [ "This setting affects the strength of the first FM slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]"] },
        { name: "fm slider 2", 
            pianoName: "FM 2", 
            maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "FM Slider 2", 
            promptDesc: ["This setting affects the strength of the second FM slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]" ] },
        { name: "fm slider 3", 
            pianoName: "FM 3", 
            maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "FM Slider 3", 
            promptDesc: ["This setting affects the strength of the third FM slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]" ] },
        { name: "fm slider 4", 
            pianoName: "FM 4", 
            maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "FM Slider 4", 
            promptDesc: ["This setting affects the strength of the fourth FM slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]"] },
        { name: "fm feedback", 
            pianoName: "FM Feedbck", 
            maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "FM Feedback", 
            promptDesc: ["This setting affects the strength of the FM feedback slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]"] },
        { name: "pulse width", 
            pianoName: "Pulse Width", 
            maxRawVol: Config.pulseWidthRange, newNoteVol: Config.pulseWidthRange, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "Pulse Width", 
            promptDesc: ["This setting controls the width of this instrument's pulse wave, just like the pulse width slider.", "At $HI, your instrument will sound like a pure square wave (on 50% of the time). It will gradually sound narrower down to $LO, where it will be inaudible (as it is on 0% of the time).", "Changing pulse width randomly between a few values is a common strategy in chiptune music to lend some personality to a lead instrument.", "[OVERWRITING] [$LO - $HI] [%Duty]"] },
        { name: "detune", 
            pianoName: "Detune", 
            maxRawVol: Config.detuneMax - Config.detuneMin, newNoteVol: Config.detuneCenter, forSong: false, convertRealFactor: -Config.detuneCenter, associatedEffect: EffectType.detune, maxIndex: 0,
            promptName: "Instrument Detune", 
            promptDesc: ["This setting controls the detune for this instrument, just like the detune slider.", "At $MID, your instrument will have no detune applied. Each tick corresponds to one cent, or one-hundredth of a pitch. Thus, each change of 100 ticks corresponds to one half-step of detune, up to two half-steps up at $HI, or two half-steps down at $LO.", "[OVERWRITING] [$LO - $HI] [cents]"] },
        { name: "vibrato depth", 
            pianoName: "Vibrato Depth", 
            maxRawVol: 200, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.vibrato, maxIndex: 0, 
            promptName: "Vibrato Depth", 
            promptDesc: ["This setting controls the amount that your pitch moves up and down by during vibrato, just like the vibrato depth slider.", "At $LO, your instrument will have no vibrato depth so its vibrato would be inaudible. This increases up to $HI, where an extreme pitch change will be noticeable.", "[OVERWRITING] [$LO - $HI] [pitch ÷25]"] },
        { name: "song detune", 
            pianoName: "Detune", 
            maxRawVol: Config.songDetuneMax - Config.songDetuneMin, newNoteVol: Math.ceil((Config.songDetuneMax - Config.songDetuneMin) / 2), forSong: true, convertRealFactor: -250, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "Song Detune", 
            promptDesc: ["This setting controls the overall detune of the entire song. There is no associated slider.", "At $MID, your song will have no extra detune applied and sound unchanged from default. Each tick corresponds to four cents, or four hundredths of a pitch. Thus, each change of 25 ticks corresponds to one half-step of detune, up to 10 half-steps up at $HI, or 10 half-steps down at $LO.", "[MULTIPLICATIVE] [$LO - $HI] [cents x4]"] },
        { name: "vibrato speed", 
            pianoName: "Vibrato Speed", 
            maxRawVol: 120, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.vibrato, maxIndex: 0,
            promptName: "Vibrato Speed", 
            promptDesc: ["This setting controls the speed your instrument will vibrato at, just like the slider.", "A setting of $LO means there will be no oscillation, and vibrato will be disabled. Higher settings will increase the speed, up to a dramatic trill at the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "vibrato delay", 
            pianoName: "Vibrato Delay", 
            maxRawVol: 50, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.vibrato, maxIndex: 0,
            promptName: "Vibrato Delay", 
            promptDesc: ["This setting controls the amount of time vibrato will be held off for before triggering for every new note, just like the slider.", "A setting of $LO means there will be no delay. A setting of 24 corresponds to one full beat of delay. As a sole exception to this scale, setting delay to $HI will completely disable vibrato (as if it had infinite delay).", "[OVERWRITING] [$LO - $HI] [beats ÷24]"] },
        { name: "arp speed", 
            pianoName: "Arp Speed", 
            maxRawVol: 50, newNoteVol: 12, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.chord, maxIndex: 0,
            promptName: "Arpeggio Speed", 
            promptDesc: ["This setting controls the speed at which your instrument's chords arpeggiate, just like the arpeggio speed slider.", "Each setting corresponds to a different speed, from the slowest to the fastest. The speeds are listed below.",
                "[0-4]: x0, x1/16, x⅛, x⅕, x¼,", "[5-9]: x⅓, x⅖, x½, x⅔, x¾,", "[10-14]: x⅘, x0.9, x1, x1.1, x1.2,", "[15-19]: x1.3, x1.4, x1.5, x1.6, x1.7,", "[20-24]: x1.8, x1.9, x2, x2.1, x2.2,", "[25-29]: x2.3, x2.4, x2.5, x2.6, x2.7,", "[30-34]: x2.8, x2.9, x3, x3.1, x3.2,", "[35-39]: x3.3, x3.4, x3.5, x3.6, x3.7," ,"[40-44]: x3.8, x3.9, x4, x4.15, x4.3,", "[45-50]: x4.5, x4.8, x5, x5.5, x6, x8", "[OVERWRITING] [$LO - $HI]"] },
        { name: "pan delay", 
            pianoName: "Pan Delay", 
            maxRawVol: 20, newNoteVol: 10, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.panning, maxIndex: 0,
            promptName: "Panning Delay", 
            promptDesc: ["This setting controls the delay applied to panning for your instrument, just like the pan delay slider.", "With more delay, the panning effect will generally be more pronounced. $MID is the default value, whereas $LO will remove any delay at all. No delay can be desirable for chiptune songs.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "reset arp", 
            pianoName: "Reset Arp", 
            maxRawVol: 1, newNoteVol: 1, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.chord, maxIndex: 0,
            promptName: "Reset Arpeggio", 
            promptDesc: ["This setting functions a little different from most. Wherever a note is placed, the arpeggio of this instrument will reset at the very start of that note. This is most noticeable with lower arpeggio speeds. The lengths and values of notes for this setting don't matter, just the note start times.", "This mod can be used to sync up your apreggios so that they always sound the same, even if you are using an odd-ratio arpeggio speed or modulating arpeggio speed.", "[$LO - $HI]"] },
        { name: "eq filter", 
            pianoName: "EQFlt", 
            maxRawVol: 10, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "EQ Filter", 
            promptDesc: ["This setting controls a few separate things for your instrument's EQ filter.", "When the option 'morph' is selected, your modulator values will indicate a sub-filter index of your EQ filter to 'morph' to over time. For example, a change from 0 to 1 means your main filter (default) will morph to sub-filter 1 over the specified duration. You can shape the main filter and sub-filters in the large filter editor ('+' button). If your two filters' number, type, and order of filter dots all match up, the morph will happen smoothly and you'll be able to hear them changing. If they do not match up, the filters will simply jump between each other.", "Note that filters will morph based on endpoints in the pattern editor. So, if you specify a morph from sub-filter 1 to 4 but do not specifically drag in new endpoints for 2 and 3, it will morph directly between 1 and 4 without going through the others.", "If you target Dot X or Dot Y, you can finely tune the coordinates of a single dot for your filter. The number of available dots to choose is dependent on your main filter's dot count.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "note filter", 
            pianoName: "N.Flt", 
            maxRawVol: 10, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.noteFilter, maxIndex: 0,
            promptName: "Note Filter", 
            promptDesc: ["This setting controls a few separate things for your instrument's note filter.", "When the option 'morph' is selected, your modulator values will indicate a sub-filter index of your note filter to 'morph' to over time. For example, a change from 0 to 1 means your main filter (default) will morph to sub-filter 1 over the specified duration. You can shape the main filter and sub-filters in the large filter editor ('+' button). If your two filters' number, type, and order of filter dots all match up, the morph will happen smoothly and you'll be able to hear them changing. If they do not match up, the filters will simply jump between each other.", "Note that filters will morph based on endpoints in the pattern editor. So, if you specify a morph from sub-filter 1 to 4 but do not specifically drag in new endpoints for 2 and 3, it will morph directly between 1 and 4 without going through the others.", "If you target Dot X or Dot Y, you can finely tune the coordinates of a single dot for your filter. The number of available dots to choose is dependent on your main filter's dot count.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "bit crush", 
            pianoName: "Bitcrush", 
            maxRawVol: Config.bitcrusherQuantizationRange-1, newNoteVol: Math.round(Config.bitcrusherQuantizationRange / 2), forSong: false, convertRealFactor: 0, associatedEffect: EffectType.bitcrusher, maxIndex: 0,
            promptName: "Instrument Bit Crush", 
            promptDesc: ["This setting controls the bit crush of your instrument, just like the bit crush slider.", "At a value of $LO, no bit crush will be applied. This increases and the bit crush effect gets more noticeable up to the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "freq crush", 
            pianoName: "Freq Crush", 
            maxRawVol: Config.bitcrusherFreqRange-1, newNoteVol: Math.round(Config.bitcrusherFreqRange / 2), forSong: false, convertRealFactor: 0, associatedEffect: EffectType.bitcrusher, maxIndex: 0,
            promptName: "Instrument Frequency Crush", 
            promptDesc: ["This setting controls the frequency crush of your instrument, just like the freq crush slider.", "At a value of $LO, no frequency crush will be applied. This increases and the frequency crush effect gets more noticeable up to the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "echo", 
            pianoName: "Echo", 
            maxRawVol: Config.echoSustainRange-1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.echo, maxIndex: 0,
            promptName: "Instrument Echo Sustain", 
            promptDesc: ["This setting controls the echo sustain (echo loudness) of your instrument, just like the echo slider.", "At $LO, your instrument will have no echo sustain and echo will not be audible. Echo sustain increases and the echo effect gets more noticeable up to the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "echo delay", 
            pianoName: "Echo Delay", 
            maxRawVol: Config.echoDelayRange, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.echo, maxIndex: 0,
            promptName: "Instrument Echo Delay", 
            promptDesc: ["This setting controls the echo delay of your instrument, just like the echo delay slider.", "At $LO, your instrument will have very little echo delay, and this increases up to 2 beats of delay at $HI.", "[OVERWRITING] [$LO - $HI] [~beats ÷12]" ]
        }, 
        { name: "chorus", 
            pianoName: "Chorus", 
            maxRawVol: Config.chorusRange - 1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.chorus, maxIndex: 0,
            promptName: "Instrument Chorus", 
            promptDesc: ["This setting controls the chorus strength of your instrument, just like the chorus slider.", "At $LO, the chorus effect will be disabled. The strength of the chorus effect increases up to the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "eq filt cut", 
            pianoName: "EQFlt Cut", 
            maxRawVol: Config.filterSimpleCutRange - 1, newNoteVol: Config.filterSimpleCutRange - 1, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "EQ Filter Cutoff Frequency", 
            promptDesc: ["This setting controls the filter cut position of your instrument, just like the filter cut slider.", "This setting is roughly analagous to the horizontal position of a single low-pass dot on the advanced filter editor. At lower values, a wider range of frequencies is cut off.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "eq filt peak", 
            pianoName: "EQFlt Peak", 
            maxRawVol: Config.filterSimplePeakRange - 1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "EQ Filter Peak Gain", 
            promptDesc: ["This setting controls the filter peak position of your instrument, just like the filter peak slider.", "This setting is roughly analagous to the vertical position of a single low-pass dot on the advanced filter editor. At lower values, the cutoff frequency will not be emphasized, and at higher values you will hear emphasis on the cutoff frequency.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "note filt cut", 
            pianoName: "N.Flt Cut", 
            maxRawVol: Config.filterSimpleCutRange - 1, newNoteVol: Config.filterSimpleCutRange - 1, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.noteFilter, maxIndex: 0,
            promptName: "Note Filter Cutoff Frequency", 
            promptDesc: ["This setting controls the filter cut position of your instrument, just like the filter cut slider.", "This setting is roughly analagous to the horizontal position of a single low-pass dot on the advanced filter editor. At lower values, a wider range of frequencies is cut off.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "note filt peak", 
            pianoName: "N.Flt Peak", 
            maxRawVol: Config.filterSimplePeakRange - 1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.noteFilter, maxIndex: 0,
            promptName: "Note Filter Peak Gain", 
            promptDesc: ["This setting controls the filter peak position of your instrument, just like the filter peak slider.", "This setting is roughly analagous to the vertical position of a single low-pass dot on the advanced filter editor. At lower values, the cutoff frequency will not be emphasized, and at higher values you will hear emphasis on the cutoff frequency.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "pitch shift", 
            pianoName: "Pitch Shift", 
            maxRawVol: Config.pitchShiftRange - 1, newNoteVol: Config.pitchShiftCenter, forSong: false, convertRealFactor: -Config.pitchShiftCenter, associatedEffect: EffectType.pitchShift, maxIndex: 0,
            promptName: "Pitch Shift", 
            promptDesc: ["This setting controls the pitch offset of your instrument, just like the pitch shift slider.", "At $MID your instrument will have no pitch shift. This increases as you decrease toward $LO pitches (half-steps) at the low end, or increases towards +$HI pitches at the high end.", "[OVERWRITING] [$LO - $HI] [pitch]"] },
        { name: "sustain", 
            pianoName: "Sustain", 
            maxRawVol: Config.stringSustainRange - 1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "Picked String Sustain", 
            promptDesc: ["This setting controls the sustain of your picked string instrument, just like the sustain slider.", "At $LO, your instrument will have minimum sustain and sound 'plucky'. This increases to a more held sound as your modulator approaches the maximum, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "mix volume", 
            pianoName: "Mix Vol.", 
            maxRawVol: Config.volumeRange, newNoteVol: Math.ceil(Config.volumeRange / 2), forSong: false, convertRealFactor: Math.ceil(-Config.volumeRange / 2.0), associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "Mix Volume", 
            promptDesc: ["This setting affects the volume of your instrument as if its volume slider had been moved.", "At $MID, an instrument's volume will be unchanged from default. This means you can still use the volume sliders to mix the base volume of instruments, since this setting and the default value work multiplicatively. The volume gradually increases up to $HI, or decreases down to mute at $LO.", "Unlike the 'note volume' setting, mix volume is very straightforward and simply affects the resultant instrument volume after all effects are applied.", "[MULTIPLICATIVE] [$LO - $HI]"] },
        { name: "fm slider 5", 
            pianoName: "FM 5", 
            maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "FM Slider 5", 
            promptDesc: ["This setting affects the strength of the fifth FM slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]"] },
        { name: "fm slider 6", 
            pianoName: "FM 6", 
            maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "FM Slider 6", 
            promptDesc: ["This setting affects the strength of the sixth FM slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]"] },
        { name: "decimal offset", 
            pianoName: "Decimal Offset", 
            maxRawVol: 99, newNoteVol: 0, forSong: false, convertRealFactor: 0, invertSliderIndicator: true, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "Decimal Offset", 
            promptDesc: ["This setting controls the decimal offset that is subtracted from the pulse width; use this for creating values like 12.5 or 6.25.", "[$LO - $HI]"] },
        { name: "envelope speed", 
            pianoName: "EnvelopeSpd", 
            maxRawVol: 50, newNoteVol: 12, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "Envelope Speed", 
            promptDesc: ["This setting controls how fast all of the envelopes for the instrument play.", "At $LO, your instrument's envelopes will be frozen, and at values near there they will change very slowly. At 12, the envelopes will work as usual, performing at normal speed. This increases up to $HI, where the envelopes will change very quickly. The speeds are given below:",
                "[0-4]: x0, x1/16, x⅛, x⅕, x¼,", "[5-9]: x⅓, x⅖, x½, x⅔, x¾,", "[10-14]: x⅘, x0.9, x1, x1.1, x1.2,", "[15-19]: x1.3, x1.4, x1.5, x1.6, x1.7,", "[20-24]: x1.8, x1.9, x2, x2.1, x2.2,", "[25-29]: x2.3, x2.4, x2.5, x2.6, x2.7,", "[30-34]: x2.8, x2.9, x3, x3.1, x3.2,", "[35-39]: x3.3, x3.4, x3.5, x3.6, x3.7," ,"[40-44]: x3.8, x3.9, x4, x4.15, x4.3,", "[45-50]: x4.5, x4.8, x5, x5.5, x6, x8", "[OVERWRITING] [$LO - $HI]"] },
        { name: "dynamism", 
            pianoName: "Dynamism", 
            maxRawVol: Config.supersawDynamismMax, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "Supersaw Dynamism", 
            promptDesc: ["This setting controls the supersaw dynamism of your instrument, just like the dynamism slider.", "At $LO, your instrument will have only a single pulse contributing. Increasing this will raise the contribution of other waves which is similar to a chorus effect. The effect gets more noticeable up to the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "spread", 
            pianoName: "Spread", 
            maxRawVol: Config.supersawSpreadMax, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "Supersaw Spread", 
            promptDesc: ["This setting controls the supersaw spread of your instrument, just like the spread slider.", "At $LO, all the pulses in your supersaw will be at the same frequency. Increasing this value raises the frequency spread of the contributing waves, up to a dissonant spread at the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "saw shape", 
            pianoName: "Saw Shape", 
            maxRawVol: Config.supersawShapeMax, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "Supersaw Shape", 
            promptDesc: ["This setting controls the supersaw shape of your instrument, just like the Saw↔Pulse slider.", "As the slider's name implies, this effect will give you a sawtooth wave at $LO, and a full pulse width wave at $HI. Values in between will be a blend of the two.", "[OVERWRITING] [$LO - $HI] [%]"] },
        { name: "individual envelope speed", 
            pianoName: "IndvEnvSpd", 
            maxRawVol: 63, newNoteVol: 23, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: this.maxEnvelopeCount-1,
            promptName: "Individual Envelope Speed", 
            promptDesc: ["This setting controls how fast the specified envelope of the instrument will play.", "At $LO, your the envelope will be frozen, and at values near there they will change very slowly. At 23, the envelope will work as usual, performing at normal speed. This increases up to $HI, where the envelope will change very quickly. The speeds are given below:",
                "[0-4]: x0, x0.01, x0.02, x0.03, x0.04,", "[5-9]: x0.05, x0.06, x0.07, x0.08, x0.09,", "[10-14]: x0.1, x0.2, x0.25, x0.3, x0.33,", "[15-19]: x0.4, x0.5, x0.6, x0.6667, x0.7,", "[20-24]: x0.75, x0.8, x0.9, x1, x1.25,", "[25-29]: x1.3333, x1.5, x1.6667, x1.75, x2,", "[30-34]: x2.25, x2.5, x2.75, x3, x3.5,", "[35-39]: x4, x4.5, x5, x5.5, x6,", "[40-44]: x6.5, x7, x7.5, x8, x8.5,", "[45-49]: x9, x9.5, x10, x11, x12", "[50-54]: x13, x14, x15, x16, x17", "[55-59]: x18, x19, x20, x24, x32", "[60-63]: x40, x64, x128, x256", "[OVERWRITING] [$LO - $HI]"]},
        { name: "song eq", 
            pianoName: "Song EQ", 
            maxRawVol: 10, newNoteVol: 0, forSong: true, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: 0,
            promptName: "Song EQ Filter", 
            promptDesc: ["This setting overwrites every instrument's eq filter. You can do this in a few separate ways, similar to the per instrument eq filter modulator.", "When the option 'morph' is selected, your modulator values will indicate a sub-filter index of your EQ filter to 'morph' to over time. For example, a change from 0 to 1 means your main filter (default) will morph to sub-filter 1 over the specified duration. You can shape the main filter and sub-filters in the large filter editor ('+' button). If your two filters' number, type, and order of filter dots all match up, the morph will happen smoothly and you'll be able to hear them changing. If they do not match up, the filters will simply jump between each other.", "Note that filters will morph based on endpoints in the pattern editor. So, if you specify a morph from sub-filter 1 to 4 but do not specifically drag in new endpoints for 2 and 3, it will morph directly between 1 and 4 without going through the others.", "If you target Dot X or Dot Y, you can finely tune the coordinates of a single dot for your filter. The number of available dots to choose is dependent on your main filter's dot count.", "[OVERWRITING] [$LO - $HI]"]},
        { name: "reset envelope", 
            pianoName: "ResetEnv", 
            maxRawVol: 1, newNoteVol: 1, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: this.maxEnvelopeCount-1,
             promptName: "Reset Envelope", 
            promptDesc: ["This setting functions a lot like the reset arp modulator. Wherever a note is placed, the envelope of this instrument at the specified index will reset at the very start of that note. ", "[$LO - $HI]",]},
        { name: "ring modulation", 
            pianoName: "Ring Mod", 
            maxRawVol: Config.ringModRange, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.ringModulation, maxIndex: 0,
            promptName: "Ring Modulation", 
            promptDesc: [ "This setting controls the Ring Modulation effect in your instrument.", "[OVERWRITING] [$LO - $HI]" ] },
        { name: "ring mod hertz", 
            pianoName: "Ring Mod(Hz)", 
            maxRawVol: Config.ringModHzRange, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.ringModulation, maxIndex: 0,
            promptName: "Ring Modulation (Hertz)", 
            promptDesc: [ "This setting controls the Hertz (Hz) used in the Ring Modulation effect in your instrument.", "[OVERWRITING] [$LO - $HI]" ] },
        { name: "granular", 
            pianoName: "Granular", 
            maxRawVol: Config.granularRange, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.granular, maxIndex: 0,
            promptName: "Granular", 
            promptDesc: [ "This setting controls the granular effect in your instrument.", "[OVERWRITING] [$LO - $HI]" ] },
        { name: "grain freq", 
            pianoName: "Grain #", 
            maxRawVol: Config.grainAmountsMax, newNoteVol: 8, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.granular, maxIndex: 0,
            promptName: "Grain Count", 
            promptDesc: [ "This setting controls the density of grains for the granular effect on your instrument." ,"[OVERWRITING] [$LO - $HI]" ] },
        { name: "grain size", 
            pianoName: "Grain Size", 
            maxRawVol: Config.grainSizeMax/Config.grainSizeStep, newNoteVol: Config.grainSizeMin/Config.grainSizeStep, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.granular, maxIndex: 0,
            promptName: "Grain Size", 
            promptDesc: [ "This setting controls the grain size of the granular effect in your instrument.", "The number shown in the mod channel is multiplied by " + Config.grainSizeStep + " to get the actual grain size." ,"[OVERWRITING] [$LO - $HI]" ] },
        { name: "grain range", 
            pianoName: "Grain Range", 
            maxRawVol: Config.grainRangeMax/Config.grainSizeStep, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.granular, maxIndex: 0,
            promptName: "Grain Range", 
            promptDesc: [ "This setting controls the range of values for your grain size of the granular effect in your instrument, from no variation to a lot", "The number shown in the mod channel is multiplied by " + Config.grainSizeStep + " to get the actual grain size." ,"[OVERWRITING] [$LO - $HI]" ] },
        { name: "individual envelope lower bound", 
            pianoName: "IndvEnvLow", 
            maxRawVol: Config.perEnvelopeBoundMax * 10, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: this.maxEnvelopeCount-1,
            promptName: "Individual Envelope Lower Bound", 
            promptDesc: ["This setting controls the envelope lower bound", "At $LO, your the envelope will output an upper envelope bound to 0, and at $HI your envelope will output an upper envelope bound to 2.", "This settings will not work if your lower envelope bound is higher than your upper envelope bound", ]},
        { name: "individual envelope upper bound", 
            pianoName: "IndvEnvUp", 
            maxRawVol: Config.perEnvelopeBoundMax * 10, newNoteVol: 10, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length, maxIndex: this.maxEnvelopeCount-1,
            promptName: "Individual Envelope Upper Bound", 
            promptDesc: ["This setting controls the envelope upper bound", "At $LO, your the envelope will output a 0 to lower envelope bound, and at $HI your envelope will output a 2 to lower envelope bound.", "This settings will not work if your lower envelope bound is higher than your upper envelope bound", ]},
        { name: "invert wave", 
            pianoName: "Invert Wave", 
            maxRawVol: 1, newNoteVol: 1, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.invertWave, maxIndex: 0,
            promptName: "Invert Wave", 
            promptDesc: [ "Allows you to toggle the Invert Wave effect on instruments. Value must be exactly 1 for this to take effect.", "[$LO - $HI]" ] },
        { name: "phaser", 
            pianoName: "Phaser", 
            maxRawVol: Config.phaserMixRange, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.phaser, maxIndex: 0,
            promptName: "Instrument Phaser", 
            promptDesc: [ "This setting controls the Phaser Mix of your insturment, just like the Phaser slider.", "At $LO, your instrument will have no phaser. At $HI, it will be at maximum.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "phaser frequency", 
            pianoName: "Phaser Frequency", 
            maxRawVol: Config.phaserFreqRange, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.phaser, maxIndex: 0,
            promptName: "Phaser Frequency", 
            promptDesc: [ "This setting controls the phaser frequency of your insturment, just like the phaser freq slider.", "At $LO, your instrument will have no phaser freq. At $HI, it will be at maximum.", "[OVERWRITING] [$LO - $HI]"] }, 
        { name: "phaser feedback", 
            pianoName: "Phaser Feedback", 
            maxRawVol: Config.phaserFeedbackRange, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.phaser, maxIndex: 0,
            promptName: "Phaser Feedback", 
            promptDesc: [ "This setting controls the phaser feedback of your insturment, just like the phaser feedback slider.", "At $LO, your instrument will have no phaser feedback. At $HI, it will be at maximum.", "[OVERWRITING] [$LO - $HI]"] },     
        { name: "phaser stages", 
            pianoName: "Phaser Stages", 
            maxRawVol: Config.phaserMaxStages, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.phaser, maxIndex: 0,
            promptName: "Phaser Stages", 
            promptDesc: [ "This setting controls the number of phaser stages in your insturment, just like the phaser stages slider.", "At $LO, your instrument will have no phaser stages. At $HI, it will be at maximum.", "[OVERWRITING] [$LO - $HI]"] },                       
        { name: "flanger mix", 
            pianoName: "Flanger Mix", 
            maxRawVol: Config.flangerMixRange, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.flanger, maxIndex: 0,
            promptName: "Flanger Mix", 
            promptDesc: [ "This setting controls the flanger mix.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "flanger delay", 
            pianoName: "Flanger Delay", 
            maxRawVol: Config.flangerDelayMax, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.flanger, maxIndex: 0,
            promptName: "Flanger Delay", 
            promptDesc: [ "This setting controls the flanger delay.", "[OVERWRITING] [$LO - $HI]"] }, 
        { name: "flanger pan", 
            pianoName: "Flanger Pan", 
            maxRawVol: Config.flangerPanMax, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.flanger, maxIndex: 0,
            promptName: "Flanger Pan", 
            promptDesc: [ "This setting controls the flanger pan.", "[OVERWRITING] [$LO - $HI]"] },     
        { name: "flanger feedmix", 
            pianoName: "Flanger Feedmix", 
            maxRawVol: Config.flangerFeedmixRange, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.flanger, maxIndex: 0,
            promptName: "Flanger Feedmix", 
            promptDesc: [ "This setting controls the flanger feedmix.", "[OVERWRITING] [$LO - $HI]"] },      
        { name: "flanger voices", 
            pianoName: "Flanger Voices", 
            maxRawVol: Config.flangerMaxVoices - Config.flangerMinVoices, newNoteVol: 0, forSong: false, convertRealFactor: Config.flangerMinVoices, associatedEffect: EffectType.flanger, maxIndex: 0,
            promptName: "Flanger Voices", 
            promptDesc: [ "This setting controls the flanger voices.", "[OVERWRITING] [$LO - $HI]"] }, 
        ]);
}

function centerWave(wave: Array<number>): Float32Array {
    let sum: number = 0.0;
    for (let i: number = 0; i < wave.length; i++) sum += wave[i];
    const average: number = sum / wave.length;
    for (let i: number = 0; i < wave.length; i++) wave[i] -= average;
    performIntegral(wave);
    // The first sample should be zero, and we'll duplicate it at the end for easier interpolation.
    wave.push(0);
    return new Float32Array(wave);
}
function centerAndNormalizeWave(wave: Array<number>): Float32Array {
    let magn: number = 0.0;

    centerWave(wave);

    // Going to length-1 because an extra 0 sample is added on the end as part of centerWave, which shouldn't impact magnitude calculation.
    for (let i: number = 0; i < wave.length - 1; i++) {
        magn += Math.abs(wave[i]);
    }
    const magnAvg: number = magn / (wave.length - 1);

    for (let i: number = 0; i < wave.length - 1; i++) {
        wave[i] = wave[i] / magnAvg;
    }

    return new Float32Array(wave);

}
export function performIntegral(wave: { length: number, [index: number]: number }): Float32Array {
    // Perform the integral on the wave. The synth function will perform the derivative to get the original wave back but with antialiasing.
    let cumulative: number = 0.0;
    let newWave: Float32Array = new Float32Array(wave.length);
    for (let i: number = 0; i < wave.length; i++) {
        newWave[i] = cumulative;
        cumulative += wave[i];
    }

    return newWave;
}
export function performIntegralOld(wave: { length: number, [index: number]: number }): void {
	// Old ver used in harmonics/picked string instruments, manipulates wave in place.
	let cumulative: number = 0.0;
	for (let i: number = 0; i < wave.length; i++) {
		const temp = wave[i];
		wave[i] = cumulative;
		cumulative += temp;
	}
}

export function getPulseWidthRatio(pulseWidth: number): number {
    // BeepBox formula for reference
    //return Math.pow(0.5, (Config.pulseWidthRange - 1 - pulseWidth) * Config.pulseWidthStepPower) * 0.5;

    return pulseWidth / (Config.pulseWidthRange * 2);
}


// The function arguments will be defined in FFT.ts, but I want
// SynthConfig.ts to be at the top of the compiled JS so I won't directly
// depend on FFT here. synth.ts will take care of importing FFT.ts.
//function inverseRealFourierTransform(array: {length: number, [index: number]: number}, fullArrayLength: number): void;
//function scaleElementsByFactor(array: {length: number, [index: number]: number}, factor: number): void;
export function getDrumWave(index: number, inverseRealFourierTransform: Function | null, scaleElementsByFactor: Function | null): Float32Array {
    let wave: Float32Array | null = Config.chipNoises[index].samples;
    if (wave == null) {
        wave = new Float32Array(Config.chipNoiseLength + 1);
        Config.chipNoises[index].samples = wave;

		if (index == 0) {
			// The "retro" drum uses a "Linear Feedback Shift Register" similar to the NES noise channel.
			let drumBuffer: number = 1;
			for (let i: number = 0; i < Config.chipNoiseLength; i++) {
				wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
				let newBuffer: number = drumBuffer >> 1;
				if (((drumBuffer + newBuffer) & 1) == 1) {
					newBuffer += 1 << 14;
				}
				drumBuffer = newBuffer;
			}
		} else if (index == 1) {
			// White noise is just random values for each sample.
			for (let i: number = 0; i < Config.chipNoiseLength; i++) {
				wave[i] = Math.random() * 2.0 - 1.0;
			}
		} else if (index == 2) {
			// The "clang" noise wave is based on a similar noise wave in the modded beepbox made by DAzombieRE.
			let drumBuffer: number = 1;
			for (let i: number = 0; i < Config.chipNoiseLength; i++) {
				wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
				let newBuffer: number = drumBuffer >> 1;
				if (((drumBuffer + newBuffer) & 1) == 1) {
					newBuffer += 2 << 14;
				}
				drumBuffer = newBuffer;
			}
		} else if (index == 3) {
			// The "buzz" noise wave is based on a similar noise wave in the modded beepbox made by DAzombieRE.
			let drumBuffer: number = 1;
			for (let i: number = 0; i < Config.chipNoiseLength; i++) {
				wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
				let newBuffer: number = drumBuffer >> 1;
				if (((drumBuffer + newBuffer) & 1) == 1) {
					newBuffer += 10 << 2;
				}
				drumBuffer = newBuffer;
			}
		} else if (index == 4) {
			// "hollow" drums, designed in frequency space and then converted via FFT:
			drawNoiseSpectrum(wave, Config.chipNoiseLength, 10, 11, 1, 1, 0);
			drawNoiseSpectrum(wave, Config.chipNoiseLength, 11, 14, .6578, .6578, 0);
			inverseRealFourierTransform!(wave, Config.chipNoiseLength);
			scaleElementsByFactor!(wave, 1.0 / Math.sqrt(Config.chipNoiseLength));
		} else if (index == 5) {
			// "Shine" drums from modbox!
			var drumBuffer = 1;
			for (var i = 0; i < Config.chipNoiseLength; i++) {
				wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
				var newBuffer = drumBuffer >> 1;
				if (((drumBuffer + newBuffer) & 1) == 1) {
					newBuffer += 10 << 2;
				}
				drumBuffer = newBuffer;
			}
		} else if (index == 6) {
			// "Deep" drums from modbox!
			drawNoiseSpectrum(wave, Config.chipNoiseLength, 1, 10, 1, 1, 0);
			drawNoiseSpectrum(wave, Config.chipNoiseLength, 20, 14, -2, -2, 0);
			inverseRealFourierTransform!(wave, Config.chipNoiseLength);
			scaleElementsByFactor!(wave, 1.0 / Math.sqrt(Config.chipNoiseLength));
		} else if (index == 7) {
			// "Cutter" drums from modbox!
			var drumBuffer = 1;
			for (var i = 0; i < Config.chipNoiseLength; i++) {
				wave[i] = (drumBuffer & 1) * 4.0 * (Math.random() * 14 + 1) - 8.0;
				var newBuffer = drumBuffer >> 1;
				if (((drumBuffer + newBuffer) & 1) == 1) {
					newBuffer += 15 << 2;
				}
				drumBuffer = newBuffer;
			}
		} else if (index == 8) {
			// "Metallic" drums from modbox!
			var drumBuffer = 1;
			for (var i = 0; i < Config.chipNoiseLength; i++) {
				wave[i] = (drumBuffer & 1) / 2.0 - 0.5;
				var newBuffer = drumBuffer >> 1;
				if (((drumBuffer + newBuffer) & 1) == 1) {
					newBuffer -= 10 << 2;
				}
				drumBuffer = newBuffer;
            }
        } else if (index == 9) {
            // a noise more like old static than white noise
            let drumBuffer: number = 1;
            for (let i: number = 0; i < Config.chipNoiseLength; i++) {
                wave[i] = (drumBuffer & 1) * 2.0 - 1.1;
                let newBuffer: number = drumBuffer >> 1;
                if (((drumBuffer + newBuffer) & 1) == 1) {
                    newBuffer += 8 ^ 2 << 16;
                }
                drumBuffer = newBuffer;
            }
		}
        else if (index == 10) {
            for (let i = 0; i < Config.chipNoiseLength; i++) {
                wave[i] = Math.round(Math.random());
            }
        }
        else if (index == 11) {
            var drumBuffer = 1;
            for (var i = 0; i < Config.chipNoiseLength; i++) {
                wave[i] = Math.round((drumBuffer & 1));
                var newBuffer = drumBuffer >> 1;
                if (((drumBuffer + newBuffer) & 1) == 1) {
                    newBuffer -= 10 << 2;
                }
                drumBuffer = newBuffer;
            }
        }
        else if (index == 12) {
            for (let i = 0; i < Config.chipNoiseLength; i++) {
                var ultraboxnewchipnoiserand = Math.random();
                wave[i] = Math.pow(ultraboxnewchipnoiserand, Math.clz32(ultraboxnewchipnoiserand));
            }
        }
        else if (index == 13) {
            // https://noisehack.com/generate-noise-web-audio-api/
            var b0 = 0, b1 = 0, b2 = 0, b3, b4, b5, b6;
            b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
            
            for (let i = 0; i < Config.chipNoiseLength; i++) {
                var white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                wave[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                wave[i] *= 0.44;
                b6 = white * 0.115926;
            }
        }
        else if (index == 14) {
            var lastOut = 0.0;
            
            for (let i = 0; i < Config.chipNoiseLength; i++) {
                var white = Math.random() * 2 - 1;
                wave[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = wave[i];
                wave[i] *= 14;
            }
        }
		
		else {
			throw new Error("Unrecognized drum index: " + index);
		}

        wave[Config.chipNoiseLength] = wave[0];
    }

    return wave;
}

export function drawNoiseSpectrum(wave: Float32Array, waveLength: number, lowOctave: number, highOctave: number, lowPower: number, highPower: number, overallSlope: number): number {
    const referenceOctave: number = 11;
    const referenceIndex: number = 1 << referenceOctave;
    const lowIndex: number = Math.pow(2, lowOctave) | 0;
    const highIndex: number = Math.min(waveLength >> 1, Math.pow(2, highOctave) | 0);
    const retroWave: Float32Array = getDrumWave(0, null, null);
    let combinedAmplitude: number = 0.0;
    for (let i: number = lowIndex; i < highIndex; i++) {

        let lerped: number = lowPower + (highPower - lowPower) * (Math.log2(i) - lowOctave) / (highOctave - lowOctave);
        let amplitude: number = Math.pow(2, (lerped - 1) * 7 + 1) * lerped;

        amplitude *= Math.pow(i / referenceIndex, overallSlope);

        combinedAmplitude += amplitude;

        // Add two different sources of psuedo-randomness to the noise
        // (individually they aren't random enough) but in a deterministic
        // way so that live spectrum editing doesn't result in audible pops.
        // Multiply all the sine wave amplitudes by 1 or -1 based on the
        // LFSR retro wave (effectively random), and also rotate the phase
        // of each sine wave based on the golden angle to disrupt the symmetry.
        amplitude *= retroWave[i];
        const radians: number = 0.61803398875 * i * i * Math.PI * 2.0;

        wave[i] = Math.cos(radians) * amplitude;
        wave[waveLength - i] = Math.sin(radians) * amplitude;
    }

    return combinedAmplitude;
}

export function getArpeggioPitchIndex(pitchCount: number, useFastTwoNoteArp: boolean, arpeggio: number): number {
    let arpeggioPattern: ReadonlyArray<number> = Config.arpeggioPatterns[pitchCount - 1];
    if (arpeggioPattern != null) {
        if (pitchCount == 2 && useFastTwoNoteArp == false) {
            arpeggioPattern = [0, 0, 1, 1];
        }
        return arpeggioPattern[arpeggio % arpeggioPattern.length];
    } else {
        return arpeggio % pitchCount;
    }
}

// Pardon the messy type casting. This allows accessing array members by numerical index or string name.
export function toNameMap<T extends BeepBoxOption>(array: Array<Pick<T, Exclude<keyof T, "index">>>): DictionaryArray<T> {
    const dictionary: Dictionary<T> = {};
    for (let i: number = 0; i < array.length; i++) {
        const value: any = array[i];
        value.index = i;
        dictionary[value.name] = <T>value;
    }
    const result: DictionaryArray<T> = <DictionaryArray<T>><any>array;
    result.dictionary = dictionary;
    return result;
}

export function effectsIncludeTransition(effects: number): boolean {
    return (effects & (1 << EffectType.transition)) != 0;
}
export function effectsIncludeChord(effects: number): boolean {
    return (effects & (1 << EffectType.chord)) != 0;
}
export function effectsIncludePitchShift(effects: number): boolean {
    return (effects & (1 << EffectType.pitchShift)) != 0;
}
export function effectsIncludeDetune(effects: number): boolean {
    return (effects & (1 << EffectType.detune)) != 0;
}
export function effectsIncludeVibrato(effects: number): boolean {
    return (effects & (1 << EffectType.vibrato)) != 0;
}
export function effectsIncludeNoteFilter(effects: number): boolean {
    return (effects & (1 << EffectType.noteFilter)) != 0;
}
export function effectsIncludeDistortion(effects: number): boolean {
    return (effects & (1 << EffectType.distortion)) != 0;
}
export function effectsIncludeBitcrusher(effects: number): boolean {
    return (effects & (1 << EffectType.bitcrusher)) != 0;
}
export function effectsIncludePanning(effects: number): boolean {
    return (effects & (1 << EffectType.panning)) != 0;
}
export function effectsIncludeChorus(effects: number): boolean {
    return (effects & (1 << EffectType.chorus)) != 0;
}
export function effectsIncludeEcho(effects: number): boolean {
    return (effects & (1 << EffectType.echo)) != 0;
}
export function effectsIncludeReverb(effects: number): boolean {
    return (effects & (1 << EffectType.reverb)) != 0;
}
export function effectsIncludeRingModulation(effects: number): boolean {
    return (effects & (1 << EffectType.ringModulation)) != 0;
}
export function effectsIncludeGranular(effects: number): boolean {
    return (effects & (1 << EffectType.granular)) != 0;
}
export function effectsIncludeNoteRange(effects: number): boolean {
    return (effects & (1 << EffectType.noteRange)) != 0;
}
export function calculateRingModHertz(sliderHz: number, sliderHzOffset: number): number {
    //replaces the value 21 with 0
    if (sliderHz == 0) return 0;
    if (sliderHz > 0) sliderHz -= 1 / Config.ringModHzRange;
    if (sliderHz > 1 / Config.ringModHzRange) sliderHz += 1 / Config.ringModHzRange;
    //calculate ring mod
    return Math.max(1, Math.floor(Config.ringModMinHz * Math.pow(Config.ringModMaxHz / Config.ringModMinHz, sliderHz) + sliderHzOffset - 200))
}

export function getScaleIntervals(song: Song): string {
    return song.scale == Config.scales.dictionary["Custom"].index ? song.scaleCustom : Config.scales[song.scale].intervals
}
export function scaleToStrings(scale: string): string[] {
    return scale.replaceAll(" ", "").split(",");
}
export function scaleToBools(scale: string, equaveDivisions: number, equaveNumerator: number, equaveDenominator: number): boolean[] {
    let scaleBools: boolean[] = [];

    if (scale == "") { //check if scale is set to "free"
        for (let i: number = 0; i < equaveDivisions; i++) {
            scaleBools.push(true);
        }
    } else {
        let equave: number = equaveNumerator / equaveDenominator;
        let scaleNums: number[] = [];
        let scaleArr: string[] = scaleToStrings(scale);

        for (let i: number = 0; i < scaleArr.length; i++) {
            let currentInterval = scaleArr[i];

            if (currentInterval.includes("/")) {
                let splitNums: string[] = currentInterval.split("/");

                if (splitNums.length == 2 && validateNumber(splitNums[0]) && validateNumber(splitNums[1])) {
                    scaleNums.push(+splitNums[0] / +splitNums[1]);
                } else {
                    return scaleToBools("", equaveDivisions, equaveNumerator, equaveDenominator);
                }
            } else if (currentInterval.includes("\\")) {
                let splitNums: string[] = currentInterval.split("\\");

                if (splitNums.length == 2 && validateNumber(splitNums[0]) && validateNumber(splitNums[1])) {
                    scaleNums.push(Math.pow(2, +splitNums[0] / +splitNums[1]));
                } else {
                    return scaleToBools("", equaveDivisions, equaveNumerator, equaveDenominator);
                }
            } else {
                if (validateNumber(currentInterval)) {
                    scaleNums.push(+currentInterval);
                } else {
                    return scaleToBools("", equaveDivisions, equaveNumerator, equaveDenominator);
                }
            }
        }
    
        for (let i: number = 0; i < equaveDivisions; i++) {
            scaleBools.push(false);
        }

        for (let i: number = 0; i < scaleNums.length; i++) {
            scaleBools[Math.round(equaveDivisions * Math.log(scaleNums[i]) / Math.log(equave)) % equaveDivisions] = true;
        }
    }

    return scaleBools;
}
function validateNumber(num: string): boolean {
    return +num + "" == num;
}

export function rawChipToIntegrated(raw: DictionaryArray<ChipWave>): DictionaryArray<ChipWave> {
    const newArray: Array<ChipWave> = new Array<ChipWave>(raw.length);
    const dictionary: Dictionary<ChipWave> = {};
    for (let i: number = 0; i < newArray.length; i++) {
        newArray[i] = Object.assign([], raw[i]);
        const value: any = newArray[i];
        value.index = i;
        dictionary[value.name] = <ChipWave>value;
    }
    for (let key in dictionary) {
        dictionary[key].samples = performIntegral(dictionary[key].samples);
    }
    const result: DictionaryArray<ChipWave> = <DictionaryArray<ChipWave>><any>newArray;
    result.dictionary = dictionary;
    return result;
}
export function effectsIncludeOctaveShift(effects: number): boolean {
    return (effects & (1 << EffectType.octaveShift)) != 0;
}
export function effectsIncludePhaser(effects: number): boolean {
	return (effects & (1 << EffectType.phaser)) != 0;
}
export function effectsIncludeFlanger(effects: number): boolean {
	return (effects & (1 << EffectType.flanger)) != 0;
}
export function effectsIncludeInvertWave(effects: number): boolean {
    return (effects & (1 << EffectType.invertWave)) != 0;
}
export function effectsIncludeCompressor(effects: number): boolean {
    return (effects & (1 << EffectType.compressor)) != 0;
}
