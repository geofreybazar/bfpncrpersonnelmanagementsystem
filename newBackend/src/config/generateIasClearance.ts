import fs from "fs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import pdfMake from "pdfmake";
import timezone from "dayjs/plugin/timezone.js";
import { PersonnelType } from "../modules/adminUsers/validation";
import type { TDocumentDefinitions } from "pdfmake/interfaces";

dayjs.extend(utc);
dayjs.extend(timezone);

const philippineTime = dayjs().tz("Asia/Manila");
const date = philippineTime.format("DD-MMMM-YYYY");

export default function generateIasClearance(
  purpose: string,
  personnel: Omit<PersonnelType, "itAdmin">,
  approverName: string,
  approverRank: string,
  pendingCaseStatus: string,
  controlNumber: string
) {
  const logoBase64 = fs.readFileSync("src/lib/images/logo.png", {
    encoding: "base64",
  });
  const patch = fs.readFileSync("src/lib/images/patch.png", {
    encoding: "base64",
  });
  const watermark = fs.readFileSync("src/lib/images/watermark.png", {
    encoding: "base64",
  });

  const fonts = {
    Roboto: {
      normal: "src/lib/fonts/Roboto-Regular.ttf",
      bold: "src/lib/fonts/Roboto-Medium.ttf",
      italics: "src/lib/fonts/Roboto-Italic.ttf",
      bolditalics: "src/lib/fonts/Roboto-MediumItalic.ttf",
    },
  };

  const printer = new pdfMake(fonts);

  const docDefinition: TDocumentDefinitions = {
    pageSize: "A4",
    pageMargins: [40, 10, 40, 10],
    background: () => {
      return {
        image: `data:image/png;base64,${watermark}`,
        width: 400,
        absolutePosition: { x: 100, y: 200 },
      };
    },

    content: [
      {
        image: `data:image/png;base64,${logoBase64}`,
        width: 200,
        alignment: "center",
        margin: [0, 0, 0, 10],
      },
      {
        stack: [
          {
            text: "Republic of the Philippines",
            fontSize: 9,
            margin: [0, 0, 0, 2],
          },
          {
            text: "Department of the Interior and Local Government",
            fontSize: 9,
            margin: [0, 0, 0, 2],
          },
          {
            text: "BUREAU OF FIRE PROTECTION",
            fontSize: 12,
            bold: true,
            margin: [0, 0, 0, 2],
          },
          {
            text: "REGION – REGIONAL HEADQUARTERS",
            fontSize: 12,
            bold: true,
            margin: [0, 0, 0, 5],
          },
          {
            text: "Ermin Garcia St., Brgy. Pinagkaisahan, Cubao, Quezon City",
            fontSize: 9,
            margin: [0, 0, 0, 2],
          },
          {
            text: "Telephone Numbers: 75779046 / 09282021169",
            fontSize: 9,
            margin: [0, 0, 0, 2],
          },
          {
            text: "Email address: rias_bfp_ncr@yahoo.com",
            fontSize: 9,
          },
        ],
        alignment: "center",
        margin: [0, 0, 0, 15],
      },
      {
        stack: [
          {
            text: "CERTIFICATION",
            alignment: "center",
            fontSize: 30,
            bold: true,
          },
          {
            text: ` CONTROL NUMBER: ${controlNumber}`,
            bold: true,
            margin: [0, 20, 0, 20],
          },
          {
            text: "TO WHOM IT MAY CONCERN:",
            bold: true,
            margin: [0, 0, 0, 10],
          },
          {
            text: [
              {
                text: "THIS IS TO CERTIFY THAT, ",
                bold: true,
              },
              { text: "as per available records of this office, " },
            ],
            margin: [50, 0, 0, 10],
          },
          {
            text: "____________________________________________________________________________________",
          },
          {
            columns: [
              { text: "(RANK)", bold: true, alignment: "center" },
              { text: "(SURNAME)", bold: true, alignment: "center" },
              { text: "(FIRST NAME)", bold: true, alignment: "center" },
              { text: "(MI)", bold: true, alignment: "center" },
            ],
            margin: [0, 0, 0, 5],
          },
          {
            text: "assigned at ________________________________________________________________________",
          },
          {
            text: "(DIVISION/OFFICE/UNIT ASSIGNMENT)                           REGION",
            margin: [80, 0, 0, 20],
            bold: true,
          },
          {
            text: "reveals,____________________________________________________________________________ ",
            margin: [0, 0, 0, 10],
          },
          {
            text: "PURPOSE: _________________________________________________________________________",
            margin: [0, 0, 0, 20],
            bold: true,
          },
          {
            text: [
              "Issued on __________________, at the Office of the Internal Affairs Service,",
            ],
            fontSize: 12,
            margin: [50, 0, 0, 0],
          },
          {
            text: [
              "Service, BFP-NCR, Ermin Garcia St., Brgy. Pinagkaisahan, Cubao, Quezon City.",
            ],
            fontSize: 12,
            margin: [0, 0, 0, 0],
          },
        ],
        margin: [30, 0, 30, 40],
      },
      {
        stack: [
          {
            columns: [
              {
                stack: [
                  {
                    text: "Verified by:",
                    bold: true,
                  },
                  {
                    text: "",
                    fontSize: 12,
                    margin: [0, 50, 0, 0],
                  },
                  {
                    text: "_____________________________",
                  },
                  {
                    text: "(Records/Clearance Verifier)",
                    fontSize: 12,
                  },
                  {
                    text: "______________________________________",
                    margin: [0, 30, 0, 0],
                  },
                  {
                    text: " (Applicant/Representative’s Signature Over Printed Name)",
                    fontSize: 8,
                  },
                  {
                    columns: [
                      {
                        text: " (LEFT THUMB MARK)",
                        fontSize: 7,
                        margin: [17, 55, 0, 0],
                      },
                      {
                        text: " (RIGHT THUMB MARK)",
                        fontSize: 7,
                        margin: [3, 55, 0, 0],
                      },
                    ],
                  },
                ],
                alignment: "left",
              },
              {
                stack: [
                  {
                    text: "________________________________",
                    bold: true,
                  },
                  {
                    text: `${approverName}`,
                    fontSize: 12,
                  },
                  {
                    text: `${approverRank} 		            BFP`,
                    fontSize: 12,
                  },
                  {
                    text: "Regional Chief,Internal Affairs Service",
                    fontSize: 12,
                  },
                  {
                    image: `data:image/png;base64,${patch}`,
                    width: 150,
                    alignment: "center",
                  },
                ],
                alignment: "center",
                bold: true,
              },
            ],
          },
        ],

        margin: [30, 10, 30, 0],
      },
      {
        text: "NOTE: Falsification is punishable by article 171/172 of the RPC and shall be administratively penalized, if appropriate.  ",
        fontSize: 9,
        margin: [30, 20, 0, 0],
      },
      {
        text: "Not valid if with erasures and without the IAS Dry Seal. Valid only for thirty (30) days from the date issued.",
        fontSize: 9,
        margin: [59, 0, 0, 0],
      },
      {
        text: "BFP-QSF-IAS-002 Rev.Ø2 (03.18.24)",
        fontSize: 9,
        absolutePosition: { x: 70, y: 820 },
      },
      {
        text: personnel.rank,
        fontSize: 15,
        absolutePosition: { x: 110, y: 325 },
        bold: true,
      },
      {
        text: personnel.lastName,
        fontSize: 15,
        absolutePosition: { x: 220, y: 325 },
        bold: true,
      },
      {
        text: personnel.firstName,
        fontSize: 15,
        absolutePosition: { x: 320, y: 325 },
        bold: true,
      },
      {
        text: personnel.middleName?.[0] ?? "",
        fontSize: 15,
        absolutePosition: { x: 460, y: 325 },
        bold: true,
      },
      {
        text: personnel.city,
        fontSize: 15,
        absolutePosition: { x: 180, y: 360 },
        bold: true,
      },
      {
        text: "NCR",
        fontSize: 15,
        absolutePosition: { x: 450, y: 360 },
        bold: true,
      },
      {
        text: purpose,
        fontSize: 15,
        absolutePosition: { x: 200, y: 430 },
        bold: true,
      },
      {
        text: date,
        fontSize: 12,
        absolutePosition: { x: 185, y: 470 },
        bold: true,
      },

      {
        text: `${personnel.rank} ${personnel.firstName} ${
          personnel.middleName?.[0] ?? ""
        } ${personnel.lastName}`,
        fontSize: 15,
        absolutePosition: { x: 95, y: 668 },
        bold: true,
      },

      {
        text: pendingCaseStatus,
        fontSize: 15,
        absolutePosition: { x: 150, y: 410 },
        bold: true,
      },

      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: 1,
            w: 100,
            h: 60,
            lineColor: "black",
            lineWidth: 1,
          },
          {
            type: "rect",
            x: 100,
            y: 1,
            w: 100,
            h: 60,
            lineColor: "black",
            lineWidth: 1,
          },
        ],
        margin: [30, 10, 0, 0],
        absolutePosition: { x: 70, y: 700 },
      },
    ],
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  return pdfDoc;
}
