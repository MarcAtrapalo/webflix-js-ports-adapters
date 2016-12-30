class Currency {
    private _isoCode: string;

    constructor(isoCode: string) {
        this.isoCode = isoCode;
    }

    get isoCode(): string {
        return this._isoCode;
    }

    set isoCode(value: string) {
        if (!/^[A-Za-z]{3}$/.test(value)) {
            throw new Error('ISO code must be a three letter code');
        }
        this._isoCode = value;
    }

    public equals(currency: Currency): boolean {
        return this._isoCode === currency._isoCode;
    }
}

export default Currency;
