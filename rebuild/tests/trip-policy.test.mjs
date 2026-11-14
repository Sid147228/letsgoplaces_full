import {test} from "node:test";
import assert from "node:assert/strict";
import {validDate,freeTripDays,validTripId} from "../lib/trip-policy.ts";

test("accepts real calendar dates only",()=>{
  assert.equal(validDate("2026-11-14"),true);
  for(const bad of ["2026-02-29","2026-04-31","2026-11-00","hello","2026-11-14T00:00:00Z",null]){
    assert.equal(validDate(bad),false,String(bad));
  }
  assert.equal(validDate("2028-02-29"),true);
});
test("enforces Aero Free one-to-three-day limits inclusively",()=>{
  assert.equal(freeTripDays("2026-11-14","2026-11-14"),1);
  assert.equal(freeTripDays("2026-11-14","2026-11-16"),3);
  assert.equal(freeTripDays("2026-12-31","2027-01-02"),3);
  assert.equal(freeTripDays("2026-11-14","2026-11-17"),0);
  assert.equal(freeTripDays("2026-11-14","2026-11-13"),0);
  assert.equal(freeTripDays("2026-02-30","2026-03-02"),0);
});
test("only accepts canonical UUIDs for owner-scoped trip operations",()=>{
  assert.equal(validTripId("7dd2a246-eced-41a8-afbb-23ab6c75c9de"),true);
  assert.equal(validTripId("7dd2a246-eced-41a8-afbb-23ab6c75c9de' OR 1=1"),false);
  assert.equal(validTripId("not-a-uuid"),false);
  assert.equal(validTripId(undefined),false);
});
