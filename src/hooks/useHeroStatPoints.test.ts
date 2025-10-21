import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useHeroStatPoints } from "./useHeroStatPoints";
import { createWrapper } from "../test/testUtils";
import * as useHeroModule from "./useHeroData";
import type { IHeroProfile } from "../type/HeroType";

vi.mock("./useHero");

describe("useHeroStatPoints", () => {
  const mockHeroId = "hero-123";
  const mockHeroProfile: IHeroProfile = {
    str: 10,
    int: 8,
    agi: 6,
    luk: 4,
  };

  const mockUseHeroProfile = vi.fn();
  const mockMutate = vi.fn();
  const mockUseUpdateHeroProfile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseHeroProfile.mockReturnValue({
      data: mockHeroProfile,
      isLoading: false,
      isError: false,
    });

    mockUseUpdateHeroProfile.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    vi.spyOn(useHeroModule, "useHeroProfile").mockImplementation(mockUseHeroProfile);
    vi.spyOn(useHeroModule, "useUpdateHeroProfile").mockImplementation(mockUseUpdateHeroProfile);
  });

  it("should initialize with hero profile data", async () => {
    const { result } = renderHook(() => useHeroStatPoints(mockHeroId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.currentPoints).toEqual(mockHeroProfile);
    });

    expect(result.current.data).toEqual(mockHeroProfile);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should calculate remaining points correctly", async () => {
    const { result } = renderHook(() => useHeroStatPoints(mockHeroId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.remainingPoints).toBe(0);
    });
  });

  it("should increment stat points correctly", async () => {
    mockUseHeroProfile.mockReturnValue({
      data: { str: 10, int: 10, agi: 10, luk: 10 },
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => useHeroStatPoints(mockHeroId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.remainingPoints).toBe(0);
    });

    result.current.handleDecrement("str");

    await waitFor(() => {
      expect(result.current.currentPoints.str).toBe(9);
      expect(result.current.remainingPoints).toBe(1);
    });

    result.current.handleIncrement("int");

    await waitFor(() => {
      expect(result.current.currentPoints.int).toBe(11);
      expect(result.current.remainingPoints).toBe(0);
    });
  });

  it("should not increment when no remaining points", async () => {
    const { result } = renderHook(() => useHeroStatPoints(mockHeroId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.currentPoints).toEqual(mockHeroProfile);
    });

    const initialStr = result.current.currentPoints.str;
    result.current.handleIncrement("str");

    await waitFor(() => {
      expect(result.current.currentPoints.str).toBe(initialStr);
    });
  });

  it("should decrement stat points correctly", async () => {
    mockUseHeroProfile.mockReturnValue({
      data: { str: 10, int: 10, agi: 10, luk: 10 },
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => useHeroStatPoints(mockHeroId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.currentPoints.str).toBe(10);
    });

    result.current.handleDecrement("str");

    await waitFor(() => {
      expect(result.current.currentPoints.str).toBe(9);
    });
  });

  it("should not decrement below zero", async () => {
    mockUseHeroProfile.mockReturnValue({
      data: { str: 0, int: 0, agi: 0, luk: 0 },
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => useHeroStatPoints(mockHeroId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.currentPoints.str).toBe(0);
    });

    result.current.handleDecrement("str");

    await waitFor(() => {
      expect(result.current.currentPoints.str).toBe(0);
    });
  });

  it("should reset to saved points", async () => {
    mockUseHeroProfile.mockReturnValue({
      data: { str: 10, int: 10, agi: 10, luk: 10 },
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => useHeroStatPoints(mockHeroId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.currentPoints.str).toBe(10);
    });

    // Make changes
    result.current.handleDecrement("str");
    result.current.handleDecrement("int");

    await waitFor(() => {
      expect(result.current.currentPoints.str).toBe(9);
      expect(result.current.currentPoints.int).toBe(9);
    });

    // Reset
    result.current.resetToSaved();

    await waitFor(() => {
      expect(result.current.currentPoints.str).toBe(10);
      expect(result.current.currentPoints.int).toBe(10);
    });
  });

  it("should check if points are equal to saved points", async () => {
    const { result } = renderHook(() => useHeroStatPoints(mockHeroId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isPointsEqual).toBe(true);
    });

    result.current.handleDecrement("str");

    await waitFor(() => {
      expect(result.current.isPointsEqual).toBe(false);
    });
  });

  it("should handle save successfully", async () => {
    mockMutate.mockImplementation((_, { onSuccess }) => {
      onSuccess();
    });

    mockUseHeroProfile.mockReturnValue({
      data: { str: 10, int: 10, agi: 10, luk: 10 },
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => useHeroStatPoints(mockHeroId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.currentPoints.str).toBe(10);
    });

    // Make a change
    result.current.handleDecrement("str");

    await waitFor(() => {
      expect(result.current.currentPoints.str).toBe(9);
    });

    // Save
    await result.current.handleSave();

    expect(mockMutate).toHaveBeenCalledWith(
      { str: 9, int: 10, agi: 10, luk: 10 },
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      })
    );
  });

  it("should handle save error", async () => {
    const mockError = new Error("Save failed");
    mockMutate.mockImplementation((_, { onError }) => {
      onError(mockError);
    });

    const { result } = renderHook(() => useHeroStatPoints(mockHeroId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.currentPoints).toEqual(mockHeroProfile);
    });

    await expect(result.current.handleSave()).rejects.toThrow("Save failed");
  });

  it("should return 0 remaining points when no data", async () => {
    mockUseHeroProfile.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => useHeroStatPoints(mockHeroId), {
      wrapper: createWrapper(),
    });

    expect(result.current.remainingPoints).toBe(0);
  });

  it("should return 0 remaining points when heroId is undefined", async () => {
    const { result } = renderHook(() => useHeroStatPoints(undefined), {
      wrapper: createWrapper(),
    });

    expect(result.current.remainingPoints).toBe(0);
  });
});
