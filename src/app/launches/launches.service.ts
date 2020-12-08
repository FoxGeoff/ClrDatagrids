import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


// See https://launchlibrary.net/docs/1.3/api.html#launch
interface Agency {
  id: number;
  name: string;
  abbrev: string;
  countryCode: string;
  type: number;
  infoURL: string;
  infoURLs: string[];
  wikiURL: string;
}

export interface Launch {
  id: number;
  name: string;
  windowstart?: string;
  windowend?: string;
  net: string;
  wsstamp: number;
  westamp: number;
  netstamp: number;
  isostart: string;
  isoend: string;
  isonet: string;
  status?: number;
  inhold: number;
  tbdtime?: number;
  infoURLs?: string[];
  infoURL?: number;
  holdreason?: string;
  failreason?: string;
  vidURLs?: string[];
  vidURL?: string;
  tbddate?: number;
  probability?: number;
  hashtag?: string;
  location: {
    pads: {
      id: number;
      name: string;
      infoURL: string;
      wikiURL: string;
      mapURL: string;
      latitude: number;
      longitude: number;
      agencies: Agency[];
    }[];
    id: number;
    name: string;
    infoURL: string;
    wikiURL: string;
    countryCode: string;
  };
  rocket?: {
    id: number;
    name: string;
    configuration: string;
    familyname: string;
    agencies: Agency[];
    wikiURL: string;
    infoURL?: string;
    infoURLs: string[];
    imageURL: string;
    imageSizes: number[];
  };
  missions?: {
    id: number;
    name: string;
    description: string;
    type: number;
    typeName: string;
    agencies: Agency[]
  }[];
  lsp?: {
    id: number;
    name: string;
    abbrev: string;
    countryCode: string;
    type: number;
    infoURL: string;
    infoURLs: string[];
    wikiURL: string;
  };
}

export interface LaunchResponse {
  launches: Launch[];
  offset: number;
  count: number;
  total: number;
}

export interface LaunchQuery {
  offset?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LaunchesService {

  private readonly baseUrl = 'https://launchlibrary.net/1.3/launch/next/10';

  constructor(private http: HttpClient) { }

  private buildUrl(options: LaunchQuery = {}) {
    // tslint:disable-next-line: prefer-const
    let query = [];
    if (options.offset) {
      query.push('offset=' + options.offset);
    }
    if (query.length) {
      return this.baseUrl + '?' + query.join('&');
    } else {
      return this.baseUrl;
    }
  }

  query(options: LaunchQuery) {
    return this.http.get<LaunchResponse>(this.buildUrl(options));
  }
}
