import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { VgCoreModule } from "videogular2/core";
import { VgControlsModule } from "videogular2/controls";
import { VgOverlayPlayModule } from "videogular2/overlay-play";
import { VgBufferingModule } from "videogular2/buffering";
import { SliderModule } from "@syncfusion/ej2-angular-inputs";

import { AppComponent } from "./app.component";
import { VideoPanelComponent } from "./video-panel/video-panel.component";
import { EditorPanelComponent } from "./editor-panel/editor-panel.component";
import { SubtitleElementComponent } from "./subtitle-element/subtitle-element.component";
import { AddSubtitleComponent } from "./add-subtitle/add-subtitle.component";
import { CompletePreviewComponent } from "./complete-preview/complete-preview.component";
import { ColorPickerComponent } from "./color-picker/color-picker.component";
import { ColorPaletteComponent } from './color-picker/color-palette/color-palette.component';
import { ColorSliderComponent } from './color-picker/color-slider/color-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoPanelComponent,
    EditorPanelComponent,
    SubtitleElementComponent,
    AddSubtitleComponent,
    CompletePreviewComponent,
    ColorPickerComponent,
    ColorPaletteComponent,
    ColorSliderComponent
  ],
  imports: [
    BrowserModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
