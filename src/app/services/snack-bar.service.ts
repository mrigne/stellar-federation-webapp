import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable, NgZone } from '@angular/core';
import { SnackBarComponent } from '../snack-bar-component/snack-bar.component';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    constructor(private snackBar: MatSnackBar,
                private zone: NgZone) {}
    public showSnack(message: string, isClosable = true, autoCloseIn = Infinity): void {
        const config: MatSnackBarConfig = {
            data: {
                message,
                isClosable
            }
        };
        if (autoCloseIn !== Infinity) {
            config.duration = autoCloseIn * 1000;
        }
        this.zone.run(() => {
            this.snackBar.openFromComponent(SnackBarComponent, config);
        });
    }
}
